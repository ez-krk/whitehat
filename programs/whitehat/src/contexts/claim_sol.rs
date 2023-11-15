use crate::state::{Analytics, Protocol};
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct ClaimSol<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
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
        has_one = owner,
        seeds = [b"protocol", owner.key().as_ref()],
        bump = protocol.state_bump,
    )]
    pub protocol: Account<'info, Protocol>,
    #[account(mut)]
    pub payout: SystemAccount<'info>,
    #[account(
        mut,
        seeds = [b"analytics"],
        bump = analytics.state_bump,
    )]
    pub analytics: Account<'info, Analytics>,
    pub system_program: Program<'info, System>,
}

impl<'info> ClaimSol<'info> {
    pub fn claim_sol(&mut self, amount: u64) -> Result<()> {

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

        let owner_accounts = Transfer {
            from: self.vault.to_account_info(),
            to: self.owner.to_account_info(),
        };

        let hacker_cpi = CpiContext::new_with_signer(
            self.system_program.to_account_info(),
            owner_accounts,
            signer_seeds,
        );

        transfer(hacker_cpi, amount)
    }

    // pub fn update_analytics(&mut self) -> Result<()> {
    //     let analytics = &mut self.analytics;
    //     let hack = &mut self.hack;
    //     let protocol = &mut self.protocol;

    //     let amount = protocol.percent * hack.amount / 100;

    //     analytics.hacks += 1;
    //     analytics.sol_recovered += hack.amount;
    //     analytics.sol_paid += amount;
    //     analytics.fees += hack.amount / 100;
    //     Ok(())
    // }
}
