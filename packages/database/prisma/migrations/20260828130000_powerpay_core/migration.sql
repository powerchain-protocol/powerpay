ALTER TYPE "PaymentAttemptStatus" ADD VALUE IF NOT EXISTS 'SUBMITTING';

ALTER TABLE "PaymentAttempt" ADD COLUMN IF NOT EXISTS "feeQuoteId" TEXT;

ALTER TABLE "PaymentAttempt" ADD COLUMN IF NOT EXISTS "idempotencyKey" TEXT;
ALTER TABLE "PaymentAttempt" ADD COLUMN IF NOT EXISTS "signedTransactionHash" TEXT;

UPDATE "PaymentAttempt" SET "idempotencyKey" = 'legacy-attempt:' || "id" WHERE "idempotencyKey" IS NULL;
ALTER TABLE "PaymentAttempt" ALTER COLUMN "idempotencyKey" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS payment_attempt_idempotency_unique ON "PaymentAttempt" ("idempotencyKey");

-- PowerPay v1 canonical payment core hardening.
-- Apply through Prisma migrate in a controlled staging/production release.

CREATE OR REPLACE FUNCTION consume_qr_nonce(p_nonce text, p_expires_at timestamptz, p_payment_intent_id text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_intent text;
  existing_expiry timestamptz;
  existing_consumed timestamptz;
BEGIN
  SELECT "paymentIntentId", "expiresAt", "consumedAt"
    INTO existing_intent, existing_expiry, existing_consumed
    FROM "QrNonce" WHERE nonce = p_nonce FOR UPDATE;

  IF FOUND THEN
    IF existing_expiry <= now() THEN
      UPDATE "QrNonce" SET "expiresAt" = p_expires_at, "consumedAt" = now(), "paymentIntentId" = p_payment_intent_id WHERE nonce = p_nonce;
      RETURN true;
    END IF;
    IF existing_consumed IS NOT NULL AND existing_intent IS NOT DISTINCT FROM p_payment_intent_id THEN
      RETURN true;
    END IF;
    IF existing_consumed IS NOT NULL THEN
      RETURN false;
    END IF;
    UPDATE "QrNonce" SET "consumedAt" = now(), "paymentIntentId" = p_payment_intent_id WHERE nonce = p_nonce;
    RETURN true;
  END IF;

  INSERT INTO "QrNonce" (nonce, "expiresAt", "consumedAt", "paymentIntentId", "createdAt")
  VALUES (p_nonce, p_expires_at, now(), p_payment_intent_id, now());
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION prevent_ledger_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'LedgerEntry is append-only';
END;
$$;

DROP TRIGGER IF EXISTS ledger_entry_append_only_update ON "LedgerEntry";
CREATE TRIGGER ledger_entry_append_only_update
BEFORE UPDATE OR DELETE ON "LedgerEntry"
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_mutation();

CREATE UNIQUE INDEX IF NOT EXISTS payment_attempt_transaction_unique
ON "PaymentAttempt" ("transactionId")
WHERE "transactionId" IS NOT NULL;

-- Immutable payment fields cannot change once an intent is locked.
CREATE OR REPLACE FUNCTION prevent_locked_payment_intent_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD."lockedAt" IS NOT NULL AND (
    NEW."recipient" IS DISTINCT FROM OLD."recipient" OR
    NEW."asset" IS DISTINCT FROM OLD."asset" OR
    NEW."amount" IS DISTINCT FROM OLD."amount" OR
    NEW."network" IS DISTINCT FROM OLD."network" OR
    NEW."reference" IS DISTINCT FROM OLD."reference" OR
    NEW."merchantId" IS DISTINCT FROM OLD."merchantId" OR
    NEW."checkoutId" IS DISTINCT FROM OLD."checkoutId" OR
    NEW."userId" IS DISTINCT FROM OLD."userId"
  ) THEN
    RAISE EXCEPTION 'Locked PaymentIntent immutable fields cannot change';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS payment_intent_locked_fields_immutable ON "PaymentIntent";
CREATE TRIGGER payment_intent_locked_fields_immutable
BEFORE UPDATE ON "PaymentIntent"
FOR EACH ROW EXECUTE FUNCTION prevent_locked_payment_intent_mutation();

-- Supabase/PostgREST hardening. Service-role API calls bypass RLS; anonymous/authenticated
-- clients receive no table access unless explicit application policies are added later.
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'User','Profile','Device','Wallet','WalletConsent','Merchant','MerchantLocation','Checkout','QrNonce',
    'PaymentIntent','PaymentQuote','PaymentAttempt','LedgerEntry','PaymentReceipt','Refund','Settlement','Token',
    'RpcProvider','ProgramDeployment','FeatureFlag','SwapQuote','CrossChainTransfer','Notification','IdempotencyRecord',
    'SecurityEvent','AuditLog'
  ] LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

REVOKE ALL ON FUNCTION consume_qr_nonce(text, timestamptz, text) FROM PUBLIC;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN
    GRANT EXECUTE ON FUNCTION consume_qr_nonce(text, timestamptz, text) TO service_role;
  END IF;
END $$;
