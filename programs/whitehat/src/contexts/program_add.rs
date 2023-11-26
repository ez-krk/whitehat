use crate::{
    errors::ErrorCode,
    state::{protocol::Data, Analytics, Protocol},
};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(program_id: Pubkey)]
pub struct ProgramAdd<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        executable
    )]
    /// CHECK: we will deserialize manually.
    pub program: AccountInfo<'info>,
    #[account(
        // constraint = program_data.upgrade_authority_address == Some(protocol.owner) @ ErrorCode::MismatchProtocolOwnerAndProgramOwner
    )]
    pub program_data: Account<'info, ProgramData>,
    #[account(
        mut,
        has_one = owner,
        realloc = Protocol::LEN + protocol.programs.len() * Data::LEN,
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

impl<'info> ProgramAdd<'info> {
    pub fn program_add(&mut self, program_id: Pubkey) -> Result<()> {
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
        require!(
            !self
                .protocol
                .programs
                .iter()
                .any(|i| i.program == self.program.key()),
            ErrorCode::ProgramAlreadyInProtocolList
        );

        // require_keys_eq!(self.owner.key(), self.program_data.upgrade_authority_address.unwrap());

        let protocol = &mut self.protocol;
        let data = Data {
            owner: self.program_data.upgrade_authority_address.unwrap(),
            program: self.program.key(),
            program_data: self.program_data.key(),
            timestamp: Clock::get()?.unix_timestamp,
        };
        protocol.programs.push(data);

        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.programs += 1;
        Ok(())
    }
}
