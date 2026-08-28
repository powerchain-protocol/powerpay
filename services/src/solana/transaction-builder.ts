import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Buffer } from 'buffer';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import type { SolanaTransactionBuilder } from '@powerpay/chain-adapters';
import type { PaymentExecutionInput, PaymentAsset } from '@powerpay/payment-core';

export interface SolanaAssetDefinition {
  asset: Exclude<PaymentAsset, 'SUI'>;
  mint?: string;
  decimals: number;
  tokenProgram: 'NATIVE' | 'SPL' | 'TOKEN_2022';
}

export interface SolanaBuilderConfig {
  rpcUrl: string;
  assets: SolanaAssetDefinition[];
}

function atomicAmount(amount: string, decimals: number): bigint {
  if (!/^\d+(\.\d+)?$/.test(amount)) throw new Error('Invalid payment amount');
  const [whole, fraction = ''] = amount.split('.');
  if (fraction.length > decimals) throw new Error(`Amount exceeds ${decimals} decimals`);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals));
}

export class SolanaPaymentTransactionBuilder implements SolanaTransactionBuilder {
  private readonly connection: Connection;
  constructor(private readonly config: SolanaBuilderConfig) { this.connection = new Connection(config.rpcUrl, 'confirmed'); }

  async buildPayment(input: PaymentExecutionInput) {
    if (input.intent.network !== 'SOLANA') throw new Error('Solana builder received non-Solana intent');
    const asset = this.config.assets.find((item) => item.asset === input.intent.asset);
    if (!asset) throw new Error(`${input.intent.asset} is not configured for Solana payments`);
    const payer = new PublicKey(input.walletAddress);
    const recipient = new PublicKey(input.intent.recipient);
    const latest = await this.connection.getLatestBlockhash('confirmed');
    const transaction = new Transaction({ feePayer: payer, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight });

    const treasuryFeeAmount = sumDecimalFees(input.fees?.serviceFee, input.fees?.protocolFee);
    const feeTreasury = treasuryFeeAmount && input.feeTreasury ? new PublicKey(input.feeTreasury) : undefined;

    if (asset.tokenProgram === 'NATIVE') {
      const amount = Number(atomicAmount(input.intent.amount, asset.decimals));
      if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('SOL amount is outside safe transaction range');
      transaction.add(SystemProgram.transfer({ fromPubkey: payer, toPubkey: recipient, lamports: amount }));
      if (feeTreasury && treasuryFeeAmount) {
        const feeLamports = Number(atomicAmount(treasuryFeeAmount, asset.decimals));
        if (!Number.isSafeInteger(feeLamports) || feeLamports <= 0) throw new Error('Service fee is outside safe transaction range');
        transaction.add(SystemProgram.transfer({ fromPubkey: payer, toPubkey: feeTreasury, lamports: feeLamports }));
      }
    } else {
      if (!asset.mint) throw new Error(`${asset.asset} mint is not configured`);
      const mint = new PublicKey(asset.mint);
      const programId = asset.tokenProgram === 'TOKEN_2022' ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
      const source = getAssociatedTokenAddressSync(mint, payer, false, programId, ASSOCIATED_TOKEN_PROGRAM_ID);
      const destination = getAssociatedTokenAddressSync(mint, recipient, false, programId, ASSOCIATED_TOKEN_PROGRAM_ID);
      transaction.add(createAssociatedTokenAccountIdempotentInstruction(payer, destination, recipient, mint, programId, ASSOCIATED_TOKEN_PROGRAM_ID));
      transaction.add(createTransferCheckedInstruction(source, mint, destination, payer, atomicAmount(input.intent.amount, asset.decimals), asset.decimals, [], programId));
      if (feeTreasury && treasuryFeeAmount) {
        const feeDestination = getAssociatedTokenAddressSync(mint, feeTreasury, false, programId, ASSOCIATED_TOKEN_PROGRAM_ID);
        transaction.add(createAssociatedTokenAccountIdempotentInstruction(payer, feeDestination, feeTreasury, mint, programId, ASSOCIATED_TOKEN_PROGRAM_ID));
        transaction.add(createTransferCheckedInstruction(source, mint, feeDestination, payer, atomicAmount(treasuryFeeAmount, asset.decimals), asset.decimals, [], programId));
      }
    }

    if (input.intent.source === 'ACTION') {
      transaction.add(new TransactionInstruction({
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
        keys: [],
        data: Buffer.from(`powerpay-attempt:${input.attempt.id}`, 'utf8'),
      }));
    }

    const serialized = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString('base64');
    return { network: 'SOLANA' as const, encoding: 'base64' as const, transaction: serialized, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight };
  }
}

function sumDecimalFees(...values: Array<string | undefined>): string | undefined {
  const defined = values.filter((value): value is string => Boolean(value && /^\d+(\.\d+)?$/.test(value)));
  if (!defined.length) return undefined;
  const decimals = Math.max(...defined.map((value) => (value.split('.')[1] || '').length));
  const scale = 10n ** BigInt(decimals);
  const total = defined.reduce((sum, value) => {
    const [whole, fraction = ''] = value.split('.');
    return sum + BigInt(whole) * scale + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals));
  }, 0n);
  if (total <= 0n) return undefined;
  const whole = total / scale;
  const fraction = (total % scale).toString().padStart(decimals, '0').replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

export function defaultSolanaAssets(env: Record<string, string | undefined>): SolanaAssetDefinition[] {
  return [
    { asset: 'SOL', decimals: Math.log10(LAMPORTS_PER_SOL), tokenProgram: 'NATIVE' },
    ...(env.USDC_MINT ? [{ asset: 'USDC' as const, mint: env.USDC_MINT, decimals: 6, tokenProgram: 'SPL' as const }] : []),
    ...(env.EURC_MINT ? [{ asset: 'EURC' as const, mint: env.EURC_MINT, decimals: 6, tokenProgram: 'SPL' as const }] : []),
    ...(env.PWRC_MINT ? [{ asset: 'PWRC' as const, mint: env.PWRC_MINT, decimals: 9, tokenProgram: 'TOKEN_2022' as const }] : []),
  ];
}
