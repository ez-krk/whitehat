use crate::{
    errors::ErrorCode,
    program::Whitehat,
    state::{Analytics, Protocol},
};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ProtocolDelete<'info> {
    #[account(mut, address=program_data.upgrade_authority_address.unwrap() @ ErrorCode::SignerNotProgramUpgradeAuthority)]
    pub owner: Signer<'info>,
    #[account(address=Whitehat::id() @ ErrorCode::WrongProgramID)]
    pub program_data: Account<'info, ProgramData>,
    #[account(
        mut,
        close = owner,
        seeds = [b"protocol", protocol.owner.key().as_ref()],
        bump = protocol.state_bump,
    )]
    pub protocol: Account<'info, Protocol>,
    #[account(
        mut,
        seeds = [b"analytics"],
        bump = analytics.state_bump,
    )]
    pub analytics: Account<'info, Analytics>,
    pub system_program: Program<'info, System>,
}

impl<'info> ProtocolDelete<'info> {
    pub fn protocol_delete(&mut self) -> Result<()> {
        // pub owner: Pubkey,
        // pub sol_vault: Pubkey,
        // pub name: String,
        // pub percent: u8,
        // pub paid : u64,
        // pub vulnerabilities: u64,
        // pub hacks: u64,
        // pub approved: u64,
        // pub created_at: i64,
        // pub bump: u8,
        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.protocols -= 1;
        Ok(())
    }
}
