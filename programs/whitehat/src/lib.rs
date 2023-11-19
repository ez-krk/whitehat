use anchor_lang::prelude::*;

mod constants;
mod contexts;
mod errors;
mod state;

use contexts::*;

declare_id!("HATo3yGickypg7QCZJjZAAMYNicGatoDp6b1WKuYx7vm");

#[program]
pub mod whitehat {
    use super::*;

    // initialize analytics and vault for fees
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize(&ctx.bumps)
    }

    // register a protocol, set a name and % paid to hackers
    pub fn protocol_register(
        ctx: Context<ProtocolRegister>,
        name: String,
        percent: u64,
    ) -> Result<()> {
        ctx.accounts.protocol_register(&ctx.bumps, name, percent)?;
        ctx.accounts.update_analytics()
    }

    pub fn program_add(ctx: Context<ProgramAdd>) -> Result<()> {
        ctx.accounts.program_add()
    }

    pub fn program_delete(ctx: Context<ProgramDelete>) -> Result<()> {
        ctx.accounts.program_delete()
    }

    // vulnerability report, text ecies encrypted off-chain for protocol owner pubkey
    pub fn vulnerability_report(
        ctx: Context<VulnerabilityReport>,
        message: Vec<u8>,
        id: u64,
        seed: u64,
    ) -> Result<()> {
        ctx.accounts
            .vulnerability_report(&ctx.bumps, message, id, seed)
    }

    // turns reviewed from `false` to `true` on vulnerability pda, only protocol owner
    pub fn vulnerability_approve(ctx: Context<VulnerabilityApprove>) -> Result<()> {
        ctx.accounts.vulnerability_approve()?;
        ctx.accounts.update_analytics()
    }

    // deposit from signer to protocol vault anonymously, hacker input payout adress through instruction accounts
    pub fn exploit_sol_deposit(ctx: Context<ExploitSolDeposit>, amount: u64) -> Result<()> {
        ctx.accounts.exploit_sol_deposit(&ctx.bumps, amount)
    }

    // (ONLY PROTOCOL OWNER) claim sol in owner's protocol vault
    pub fn dispute_sol(ctx: Context<DisputeSol>, amount: u64) -> Result<()> {
        ctx.accounts.dispute_sol(amount)
    }

    // (ONLY PROTOCOL OWNER) pay the hacker to inputed payout address for % set by protocol
    pub fn exploit_sol_approve(ctx: Context<ExploitSolApprove>) -> Result<()> {
        ctx.accounts.exploit_sol_approve()?;
        ctx.accounts.update_analytics()
    }

    // (ONLY ADMIN) delete a protocol (ban)
    pub fn delete_protocol(ctx: Context<ProtocolDelete>) -> Result<()> {
        ctx.accounts.protocol_delete()?;
        ctx.accounts.update_analytics()
    }

    // (ONLY ADMIN) delete a vulnerability (triage, disputes)
    pub fn delete_vulnerability(ctx: Context<VulnerabilityDelete>) -> Result<()> {
        ctx.accounts.vulnerability_delete()?;
        ctx.accounts.update_analytics()
    }

    // (ONLY ADMIN) delete a vulnerability (triage, disputes)
    pub fn exploit_sol_delete(ctx: Context<ExploitSolDelete>) -> Result<()> {
        ctx.accounts.exploit_sol_delete()
    }
}
