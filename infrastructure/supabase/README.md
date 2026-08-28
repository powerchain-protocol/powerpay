# Supabase / PostgreSQL

Run the baseline Prisma migration first, then the PowerPay hardening migration.

The hardening migration installs:

- atomic QR nonce consumption;
- append-only ledger enforcement;
- unique transaction-ID protection;
- locked payment-intent mutation protection;
- RLS enablement on application tables;
- service-role-only nonce RPC execution.

`DATABASE_URL` is intended for pooled application runtime where applicable. `DIRECT_URL` is used by Prisma CLI migrations.
