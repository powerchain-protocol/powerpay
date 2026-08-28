use anchor_lang::prelude::*;

declare_id!(env!("POWERPAY_CHECKOUT_PROGRAM_ID"));

#[program]
pub mod powerpay_checkout {
    use super::*;

    pub fn initialize_merchant(
        ctx: Context<InitializeMerchant>,
        merchant_id: [u8; 32],
        settlement_wallet: Pubkey,
    ) -> Result<()> {
        let merchant = &mut ctx.accounts.merchant;
        merchant.authority = ctx.accounts.authority.key();
        merchant.merchant_id = merchant_id;
        merchant.settlement_wallet = settlement_wallet;
        merchant.enabled = true;
        merchant.bump = ctx.bumps.merchant;
        Ok(())
    }

    pub fn create_checkout(
        ctx: Context<CreateCheckout>,
        reference: [u8; 32],
        mint: Pubkey,
        amount: u64,
        expires_at: i64,
    ) -> Result<()> {
        require!(amount > 0, CheckoutError::InvalidAmount);
        let now = Clock::get()?.unix_timestamp;
        require!(expires_at > now, CheckoutError::InvalidExpiry);
        require!(ctx.accounts.merchant.enabled, CheckoutError::MerchantDisabled);

        let checkout = &mut ctx.accounts.checkout;
        checkout.merchant = ctx.accounts.merchant.key();
        checkout.reference = reference;
        checkout.mint = mint;
        checkout.amount = amount;
        checkout.expires_at = expires_at;
        checkout.status = CheckoutStatus::Open;
        checkout.created_at = now;
        checkout.bump = ctx.bumps.checkout;
        Ok(())
    }

    pub fn cancel_checkout(ctx: Context<ManageCheckout>) -> Result<()> {
        let checkout = &mut ctx.accounts.checkout;
        require!(checkout.status == CheckoutStatus::Open, CheckoutError::InvalidState);
        checkout.status = CheckoutStatus::Cancelled;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(merchant_id: [u8; 32])]
pub struct InitializeMerchant<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + Merchant::INIT_SPACE,
        seeds = [b"merchant", authority.key().as_ref(), merchant_id.as_ref()],
        bump
    )]
    pub merchant: Account<'info, Merchant>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(reference: [u8; 32])]
pub struct CreateCheckout<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(has_one = authority)]
    pub merchant: Account<'info, Merchant>,
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = payer,
        space = 8 + Checkout::INIT_SPACE,
        seeds = [b"checkout", merchant.key().as_ref(), reference.as_ref()],
        bump
    )]
    pub checkout: Account<'info, Checkout>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ManageCheckout<'info> {
    pub authority: Signer<'info>,
    #[account(has_one = authority)]
    pub merchant: Account<'info, Merchant>,
    #[account(mut, has_one = merchant)]
    pub checkout: Account<'info, Checkout>,
}

#[account]
#[derive(InitSpace)]
pub struct Merchant {
    pub authority: Pubkey,
    pub merchant_id: [u8; 32],
    pub settlement_wallet: Pubkey,
    pub enabled: bool,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Checkout {
    pub merchant: Pubkey,
    pub reference: [u8; 32],
    pub mint: Pubkey,
    pub amount: u64,
    pub expires_at: i64,
    pub created_at: i64,
    pub status: CheckoutStatus,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, InitSpace, PartialEq, Eq)]
pub enum CheckoutStatus {
    Open,
    Cancelled,
    Settled,
}

#[error_code]
pub enum CheckoutError {
    #[msg("Payment amount must be greater than zero")]
    InvalidAmount,
    #[msg("Checkout expiration must be in the future")]
    InvalidExpiry,
    #[msg("Merchant is disabled")]
    MerchantDisabled,
    #[msg("Checkout is not in the required state")]
    InvalidState,
}
