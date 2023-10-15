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
const WHITEHAT_OWNER = "7sydHcmax59DZJ523tFQEakwkJ3vBDWUE64auHy7yn1N";
const WHITEHAT_VAULT = "Bbs5osLKjrJNQCnH1dX9b8d9SaRqokXAKubCpaQFuNFH";
const VULNERABILITY = "99REDyZiRizZPj2M5RxXms129A2xz8FquJexw6kayZqQ";
const PAYOUT = "3MDmFxEzc6PxFpM72H95PhxygK4f3gaSbKkr4R1dP3jz";

const keypair = Keypair.fromSecretKey(new Uint8Array(sender));

const connection = new Connection("https://api.devnet.solana.com");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program = new Program(IDL, PROGRAM_ID as Address, provider);

(async () => {
  try {
    const amount = new BN(20 * LAMPORTS_PER_SOL);

    const protocol = PublicKey.findProgramAddressSync(
      [Buffer.from("protocol"), new PublicKey(WHITEHAT_OWNER).toBuffer()],
      program.programId
    )[0];

    const vulnerability = PublicKey.findProgramAddressSync(
      // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
      [
        Buffer.from("vulnerability"),
        protocol.toBytes(),
        new BN(1).toArrayLike(Buffer, "le", 8),
        new BN(980).toArrayLike(Buffer, "le", 8),
      ],
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
        vault: new PublicKey(WHITEHAT_VAULT),
        vulnerability,
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
