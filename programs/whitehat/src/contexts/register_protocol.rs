use crate::{
    constants::*,
    errors::ErrorCode,
    state::{Analytics, Protocol},
};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(name: String, percent: u64)]
pub struct RegisterProtocol<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account()]
    pub encryption: SystemAccount<'info>,
    #[account(
        init,
        payer = owner,
        seeds = [b"protocol", owner.key().as_ref()],
        bump,
        space = Protocol::LEN
    )]
    pub protocol: Account<'info, Protocol>,
    #[account(
        seeds = [b"auth", protocol.key().as_ref()],
        bump
    )]
    /// CHECK: This is safe
    pub auth: UncheckedAccount<'info>,
    #[account(
        mut,
        seeds = [b"vault", protocol.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,
    #[account(
        mut,
        seeds = [b"analytics"],
        bump = analytics.state_bump,
    )]
    pub analytics: Account<'info, Analytics>,
    pub system_program: Program<'info, System>,
}

impl<'info> RegisterProtocol<'info> {
    pub fn register_protocol(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        name: String,
        percent: u64,
    ) -> Result<()> {
        if name.len() > MAX_PROTOCOL_LENGTH {
            return err!(ErrorCode::ProtocolNameTooLong);
        } else if name.len() == 0 {
            return err!(ErrorCode::ProtocolNameEmpty);
        }

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
        protocol.owner = self.owner.key();
        protocol.encryption = self.encryption.key();
        protocol.vault = self.vault.key();
        protocol.programs = Vec::new();
        protocol.name = name;
        protocol.percent = percent;
        protocol.paid = 0;
        protocol.vulnerabilities = 0;
        protocol.hacks = 0;
        protocol.auth_bump = *bumps.get("auth").unwrap();
        protocol.vault_bump = *bumps.get("vault").unwrap();
        protocol.state_bump = *bumps.get("protocol").unwrap();
        protocol.created_at = Clock::get()?.unix_timestamp;

        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.protocols += 1;
        Ok(())
    }
}
