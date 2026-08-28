use anchor_lang::prelude::*;

declare_id!(env!("POWERPAY_SETTLEMENT_PROGRAM_ID"));

pub const POWERPAY_SERVICE_FEE_BPS: u64 = 200;
pub const BPS_DENOMINATOR: u64 = 10_000;

#[program]
pub mod powerpay_settlement {
    use super::*;

    pub fn initialize_config(ctx: Context<InitializeConfig>, fee_treasury: Pubkey) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.authority = ctx.accounts.authority.key();
        config.fee_treasury = fee_treasury;
        config.service_fee_bps = POWERPAY_SERVICE_FEE_BPS as u16;
        config.bump = ctx.bumps.config;
        Ok(())
    }

    pub fn record_settlement(
        ctx: Context<RecordSettlement>,
        payment_reference: [u8; 32],
        mint: Pubkey,
        purchase_amount: u64,
        payer: Pubkey,
        merchant: Pubkey,
        transaction_signature_hash: [u8; 32],
    ) -> Result<()> {
        require!(purchase_amount > 0, SettlementError::InvalidAmount);
        let service_fee = fee_ceil(purchase_amount, ctx.accounts.config.service_fee_bps)?;
        let receipt = &mut ctx.accounts.receipt;
        receipt.payment_reference = payment_reference;
        receipt.mint = mint;
        receipt.purchase_amount = purchase_amount;
        receipt.service_fee = service_fee;
        receipt.payer = payer;
        receipt.merchant = merchant;
        receipt.transaction_signature_hash = transaction_signature_hash;
        receipt.settled_at = Clock::get()?.unix_timestamp;
        receipt.bump = ctx.bumps.receipt;
        Ok(())
    }
}

fn fee_ceil(amount: u64, bps: u16) -> Result<u64> {
    let numerator = (amount as u128)
        .checked_mul(bps as u128)
        .ok_or(SettlementError::MathOverflow)?;
    let fee = numerator
        .checked_add((BPS_DENOMINATOR - 1) as u128)
        .ok_or(SettlementError::MathOverflow)?
        / BPS_DENOMINATOR as u128;
    u64::try_from(fee).map_err(|_| error!(SettlementError::MathOverflow))
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(init, payer = authority, space = 8 + SettlementConfig::INIT_SPACE, seeds = [b"config"], bump)]
    pub config: Account<'info, SettlementConfig>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(payment_reference: [u8; 32])]
pub struct RecordSettlement<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, SettlementConfig>,
    #[account(
        init,
        payer = payer,
        space = 8 + SettlementReceipt::INIT_SPACE,
        seeds = [b"receipt", payment_reference.as_ref()],
        bump
    )]
    pub receipt: Account<'info, SettlementReceipt>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct SettlementConfig {
    pub authority: Pubkey,
    pub fee_treasury: Pubkey,
    pub service_fee_bps: u16,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct SettlementReceipt {
    pub payment_reference: [u8; 32],
    pub mint: Pubkey,
    pub purchase_amount: u64,
    pub service_fee: u64,
    pub payer: Pubkey,
    pub merchant: Pubkey,
    pub transaction_signature_hash: [u8; 32],
    pub settled_at: i64,
    pub bump: u8,
}

#[error_code]
pub enum SettlementError {
    #[msg("Payment amount must be greater than zero")]
    InvalidAmount,
    #[msg("Settlement math overflow")]
    MathOverflow,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fee_rounds_up() {
        assert_eq!(fee_ceil(1, 200).unwrap(), 1);
        assert_eq!(fee_ceil(10_000, 200).unwrap(), 200);
        assert_eq!(fee_ceil(10_001, 200).unwrap(), 201);
    }
}
