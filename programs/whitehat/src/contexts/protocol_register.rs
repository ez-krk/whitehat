use crate::{
    constants::*,
    errors::ErrorCode,
    state::{protocol::Data, Analytics, Protocol},
};
use anchor_lang::prelude::*;
use std::collections::BTreeMap;

#[derive(Accounts)]
#[instruction(name: String, percent: u64, program_id: Pubkey)]
pub struct ProtocolRegister<'info> {
    #[account(
        mut,
        // constraint = owner.key() == user_program_data.upgrade_authority_address.unwrap()  @ ErrorCode::SignerNotProgramUpgradeAuthority,
    )]
    pub owner: Signer<'info>,
    // #[account(executable, address=program_id)]
    /// CHECK: we will deserialize manually.
    // pub user_program: AccountInfo<'info>,
    // #[account(
    //     seeds = [user_program.key().as_ref(), b"BPFLoaderUpgradeab1e11111111111111111111111"], 
    //     bump,
    // )]
    // pub user_program_data: Account<'info, ProgramData>,
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

impl<'info> ProtocolRegister<'info> {
    pub fn protocol_register(
        &mut self,
        bumps: &BTreeMap<String, u8>,
        name: String,
        percent: u64,
        program_id: Pubkey
    ) -> Result<()> {
        if name.len() > MAX_PROTOCOL_LENGTH {
            return err!(ErrorCode::ProtocolNameTooLong);
        } else if name.len() == 0 {
            return err!(ErrorCode::ProtocolNameEmpty);
        }

        // let user_program = &self.user_program;
        // require_keys_eq!(user_program.key(), program_id);

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
        protocol.name = name;
        protocol.percent = percent;
        protocol.paid = 0;
        protocol.vulnerabilities = 0;
        protocol.exploits = 0;
        protocol.delay = 0;
        let timestamp = Clock::get()?.unix_timestamp;
        // protocol.programs = Vec::new();
        // let data = Data {
        //     address: self.user_program.key(),
        //     timestamp,
        // };
        // protocol.programs.push(data);
        protocol.created_at = timestamp;
        protocol.auth_bump = *bumps.get("auth").unwrap();
        protocol.vault_bump = *bumps.get("vault").unwrap();
        protocol.state_bump = *bumps.get("protocol").unwrap();

        // let programdata_address = self.program.programdata_address().unwrap();
        // msg!("{:#?}", programdata_address.unwrap().to_string());
        Ok(())
    }
    pub fn update_analytics(&mut self) -> Result<()> {
        let analytics = &mut self.analytics;
        analytics.protocols += 1;
        Ok(())
    }
}
