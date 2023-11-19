use crate::{
    errors::ErrorCode,
    program::Whitehat,
    state::{Analytics, Protocol},
};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{transfer, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct DisputeSpl<'info> {
    #[account(mut, address=program_data.upgrade_authority_address.unwrap() @ ErrorCode::SignerNotProgramUpgradeAuthority)]
    pub owner: Signer<'info>,
    #[account(address=Whitehat::id() @ ErrorCode::WrongProgramID)]
    pub program_data: Account<'info, ProgramData>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = owner,
    )]
    owner_ata: Account<'info, TokenAccount>,
    mint: Account<'info, Mint>,

    #[account(mut)]
    pub destination: SystemAccount<'info>,
    #[account(
        seeds = [b"auth", protocol.key().as_ref()],
        bump = protocol.auth_bump
    )]
    /// CHECK: This is safe
    auth: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [b"vault", protocol.key().as_ref()],
        bump = protocol.vault_bump
    )]
    vault: SystemAccount<'info>,
    #[account(
        mut,
        seeds = [b"protocol", owner.key().as_ref()],
        bump = protocol.state_bump,
    )]
    pub protocol: Account<'info, Protocol>,
    token_program: Program<'info, Token>,
    associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> DisputeSpl<'info> {
    pub fn dispute_spl(&mut self, amount: u64) -> Result<()> {
        // pub payout: Pubkey,
        // pub protocol: Pubkey,
        // pub value: u64,
        // pub reviewed: bool,
        // pub created_at: i64,
        // pub bump: u8,
        // pub seed: u64,

        let accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.owner_ata.to_account_info(),
            authority: self.auth.to_account_info(),
        };

        let seeds = &[
            b"auth",
            self.protocol.to_account_info().key.as_ref(),
            &[self.protocol.auth_bump],
        ];

        let signer_seeds = &[&seeds[..]];

        let cpi = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            accounts,
            signer_seeds,
        );

        transfer(cpi, amount)
    }
}
