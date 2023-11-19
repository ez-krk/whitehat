use crate::{errors::ErrorCode, program::Whitehat, state::Protocol};
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct DisputeSol<'info> {
    #[account(mut, address=program_data.upgrade_authority_address.unwrap() @ ErrorCode::SignerNotProgramUpgradeAuthority)]
    pub owner: Signer<'info>,
    #[account(address=Whitehat::id() @ ErrorCode::WrongProgramID)]
    pub program_data: Account<'info, ProgramData>,
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
    pub system_program: Program<'info, System>,
}

impl<'info> DisputeSol<'info> {
    pub fn dispute_sol(&mut self, amount: u64) -> Result<()> {
        // pub payout: Pubkey,
        // pub protocol: Pubkey,
        // pub value: u64,
        // pub reviewed: bool,
        // pub created_at: i64,
        // pub bump: u8,
        // pub seed: u64,

        let seeds = &[
            b"vault",
            self.protocol.to_account_info().key.as_ref(),
            &[self.protocol.vault_bump],
        ];

        let signer_seeds = &[&seeds[..]];

        let destination_accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.destination.to_account_info(),
        };

        let hacker_cpi = CpiContext::new_with_signer(
            self.system_program.to_account_info(),
            destination_accounts,
            signer_seeds,
        );

        transfer(hacker_cpi, amount)
    }
}
