use crate::{
    errors::ErrorCode,
    state::{protocol::Data, Analytics, Protocol},
};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ProgramDelete<'info> {
    #[account(mut, address=protocol.owner @ ErrorCode::SignerNotProtocolOwner)]
    pub owner: Signer<'info>,
    #[account(
        executable,
        constraint = protocol.programs.iter().any(|i| i.address == program_data.key()) @ ErrorCode::ProgramNotInProtocolList
    )]
    pub program_data: Account<'info, ProgramData>,
    #[account(
        mut,
        has_one = owner,
        realloc = Protocol::LEN + (protocol.programs.len() - 1) * Data::LEN,
        realloc::zero = false,
        realloc::payer = owner,
        seeds = [b"protocol", owner.key().as_ref()],
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

impl<'info> ProgramDelete<'info> {
    pub fn program_delete(&mut self) -> Result<()> {
        // pub owner: Pubkey,
        // pub encryption: Pubkey,
        // pub vault: Pubkey,
        // pub programs: Vec<Data>,
        // pub name: String,
        // pub percent: u64,
        // pub paid : u64,
        // pub vulnerabilities: u64,
        // pub hacks: u64,
        // pub created_at: i64,
        // pub auth_bump: u8,
        // pub vault_bump: u8,
        // pub state_bump: u8,

        let protocol = &mut self.protocol;

        let index = protocol
            .programs
            .iter()
            .position(|data| data.address == self.program_data.key())
            .unwrap();

        protocol.programs.remove(index);

        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.programs -= 1;
        Ok(())
    }
}
