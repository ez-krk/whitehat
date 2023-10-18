import { IDL } from "./idl/whitehat";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import sender from "./sender.json";
import {
  Address,
  AnchorProvider,
  BN,
  Program,
  Wallet,
} from "@coral-xyz/anchor";

const PROGRAM_ID = "HATNBZtwk8uLUZeSuYK8QYwWzk1kT5didcGFs9a6GtTW";

const PROGRAM_OWNER = "HZ7wsomAGjQpg63uuTMFfFGwZfeKo8i76ZREwf4tes87";
const PROGRAM_VAULT = "9qmtSSM5KdchcAvM6tjfaKG1WvHFo8ub2jdyk33qQK6o";
const VULNERABILITY = "3B3REVwoSu7R2yWF5AiREYZjKoDPJnzcpc2GUQ1sDd5R";

// defined by the hacker to get paid 
const PAYOUT = "3MDmFxEzc6PxFpM72H95PhxygK4f3gaSbKkr4R1dP3jz";

const keypair = Keypair.fromSecretKey(new Uint8Array(sender));

const connection = new Connection("https://api.devnet.solana.com");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program = new Program(IDL, PROGRAM_ID as Address, provider);

(async () => {
  try {
    const amount = new BN(1 * LAMPORTS_PER_SOL);

    const protocol = PublicKey.findProgramAddressSync(
      [Buffer.from("protocol"), new PublicKey(PROGRAM_OWNER).toBuffer()],
      program.programId
    )[0];

    const hack = PublicKey.findProgramAddressSync(
      // b"hack", protocol.key().as_ref(), amount.to_le_bytes().as_ref()
      [Buffer.from("hack"), protocol.toBytes(), amount.toBuffer("le", 8)],
      program.programId
    )[0];

    const tx = await program.methods
      .depositSolHack(amount)
      .accounts({
        signer: keypair.publicKey,
        payout: new PublicKey(PAYOUT),
        protocol,
        vault: new PublicKey(PROGRAM_VAULT),
        vulnerability: new PublicKey(VULNERABILITY),
        hack,
        systemProgram: SystemProgram.programId,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
      https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  } catch (error) {
    console.log(error);
  }
})();
