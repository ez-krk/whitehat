use anchor_lang::prelude::*;

use crate::constants::*;

#[account]
pub struct Protocol {
    pub owner: Pubkey,
    pub encryption: Pubkey,
    pub vault: Pubkey,
    pub percent: u64,
    pub paid : u64,
    pub vulnerabilities: u64,
    pub exploits: u64,
    pub created_at: i64,
    pub delay: i64,
    pub name: String,
    pub programs: Vec<Data>,
    pub auth_bump: u8,
    pub vault_bump: u8,
    pub state_bump: u8,
}

impl Protocol {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH * 3 // owner, encryption, vault
        + VECTOR_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX 
        + MAX_PROTOCOL_LENGTH
        + 8 * 4 // percent, paid, vulnerabilities, hacks
        + TIMESTAMP_LENGTH // created_at
        + BUMP_LENGTH * 3; // bump
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize, PartialEq)]
pub struct Data {
    pub owner: Pubkey,
    pub program: Pubkey,
    pub program_data: Pubkey,
    pub timestamp: i64,
}

impl Data {
    pub const LEN:usize = PUBLIC_KEY_LENGTH * 2 + 8;
}
