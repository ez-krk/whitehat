use crate::{
    constants::*,
    errors::ErrorCode,
    state::{Analytics, Protocol, protocol::Data},
};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(name: String, percent: u64)]
pub struct AddProgram<'info> {
    #[account(mut, address=program_data.upgrade_authority_address.unwrap())]
    pub owner: Signer<'info>,
    #[account(
        executable,
        constraint = program.key() == Some(program_data.key()).unwrap()
    )]
    /// CHECK: we check the account is a program (executable), and matches the program_data
    pub program : AccountInfo<'info>,
    pub program_data: Account<'info, ProgramData>,
    #[account(
        mut,
        has_one = owner,
        realloc = Protocol::LEN + (32 + 8),
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

impl<'info> AddProgram<'info> {
    pub fn add_program(
        &mut self,
    ) -> Result<()> {
        // pub owner: Pubkey,
        // pub encryption: Pubkey,
        // pub vault: Pubkey,
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
        let data = Data {address : self.program.key(), added_date : Clock::get()?.unix_timestamp};
        protocol.programs.push(data);

        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.programs += 1;
        Ok(())
    }
}
