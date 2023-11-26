import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { Whitehat } from "../target/types/whitehat";

import fs from "fs";
import nacl from "tweetnacl";
import { Ed25519Ecies } from "@whitehat-xyz/ed25519-ecies";

const commitment: Commitment = "confirmed";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const bytes = [
  238, 70, 241, 10, 45, 158, 105, 159, 221, 214, 252, 52, 166, 132, 222, 215,
  103, 33, 67, 85, 200, 115, 90, 106, 137, 66, 211, 131, 206, 248, 120, 159, 54,
  191, 228, 77, 48, 129, 90, 95, 204, 54, 148, 255, 43, 254, 72, 238, 59, 207,
  190, 180, 179, 174, 103, 23, 45, 31, 221, 19, 121, 177, 242, 208,
];

describe("whitehat", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Whitehat as Program<Whitehat>;
  const connection: Connection = anchor.getProvider().connection;

  const admin = Keypair.fromSecretKey(new Uint8Array(bytes));
  const owner = new Keypair();
  const signer = new Keypair();
  const payout = new Keypair();
  const encryption = new Keypair();

  //  owner
  //  auth
  //  sol_vault
  //  state
  //  protocol
  //  system_program

  const analytics = PublicKey.findProgramAddressSync(
    [Buffer.from("analytics")],
    program.programId
  )[0];
  const whauth = PublicKey.findProgramAddressSync(
    [Buffer.from("auth")],
    program.programId
  )[0];
  const whvault = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  )[0];

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from("protocol"), admin.publicKey.toBuffer()],
    program.programId
  )[0];

  const auth = PublicKey.findProgramAddressSync(
    [Buffer.from("auth"), protocol.toBytes()],
    program.programId
  )[0];

  const vault = PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), protocol.toBytes()],
    program.programId
  )[0];

  const [programData, _bump] = PublicKey.findProgramAddressSync(
    [program.programId.toBytes()],
    new PublicKey("BPFLoaderUpgradeab1e11111111111111111111111")
  );
  console.log(programData.toString());

  const percent = new BN(10);
  const seed = new BN(getRandomInt(1337));

  const message = new Uint8Array([
    4, 123, 82, 201, 77, 181, 1, 94, 165, 47, 19, 121, 237, 205, 155, 44, 151,
    64, 216, 179, 28, 13, 172, 233, 31, 75, 1, 231, 170, 79, 20, 55, 200, 247,
    173, 52, 177, 192, 216, 13, 85, 110, 56, 42, 133, 115, 167, 0, 102, 157, 27,
    153, 226, 131, 210, 205, 167, 54, 172, 18, 124, 137, 4, 221, 93, 223, 197,
    252, 200, 248, 105, 188, 151, 153, 237, 215, 242, 73, 105, 189, 8, 77, 98,
    85, 113, 42, 195, 14, 221, 104, 236, 160, 141, 113, 230, 25, 41, 235, 29,
    199, 13, 246, 142, 217, 177, 174, 9, 130, 131,
  ]);

  const vulnerability = PublicKey.findProgramAddressSync(
    // b"vulnerability", protocol.key().as_ref(), protocol.vulnerabilities.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
    [
      Buffer.from("vulnerability"),
      protocol.toBytes(),
      new BN(1).toBuffer("le", 8),
      seed.toBuffer("le", 8),
    ],
    program.programId
  )[0];

  const amount = new BN(10 * LAMPORTS_PER_SOL);

  const exploit = PublicKey.findProgramAddressSync(
    // b"exploit", protocol.key().as_ref(), amount.to_le_bytes().as_ref()
    [Buffer.from("exploit"), protocol.toBytes(), amount.toBuffer("le", 8)],
    program.programId
  )[0];

  it("airdrop", async () => {
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        admin.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        owner.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        signer.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
    await anchor
      .getProvider()
      .connection.requestAirdrop(
        encryption.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      )
      .then(confirmTx);
  });

  it("initialize analytics", async () => {
    await program.methods
      .initialize()
      .accounts({
        admin: admin.publicKey,
        auth: whauth,
        vault: whvault,
        analytics,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc()
      .then(confirmTx);
  });

  it("register protocol", async () => {
    await program.methods
      .protocolRegister("whitehat", percent, program.programId)
      .accounts({
        owner: admin.publicKey,
        encryption: encryption.publicKey,
        auth,
        vault,
        protocol,
        // userProgram: program.programId,
        analytics,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc()
      .then(confirmTx);
  });

  it("add program to protocol", async () => {
    await program.methods
      .programAdd(program.programId)
      .accounts({
        owner: admin.publicKey,
        program: program.programId,
        programData,
        protocol,
        analytics,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc()
      .then(confirmTx)
      .then(async () => {
        const pda = await program.account.protocol.fetch(protocol);
        console.log(pda);
      });
  });

  it("report vulnerability", async () => {
    const msg = fs.readFileSync("./message.txt", {
      encoding: "utf8",
      flag: "r",
    });
    console.log(msg);

    const text = await Ed25519Ecies.encrypt(
      Buffer.from(msg),
      // Buffer.from(message),
      encryption.publicKey.toBuffer()
    );

    console.log(text);

    console.log(vulnerability);

    await program.methods
      .vulnerabilityReport(text, new BN(1), seed)
      .accounts({
        signer: signer.publicKey,
        payout: payout.publicKey,
        program: program.programId,
        programData,
        vulnerability,
        systemProgram: SystemProgram.programId,
      })
      .signers([signer])
      .rpc()
      .then(confirmTx);

    // .then(async () => {
    //   const pda = program.account.vulnerability.fetch(vulnerability);
    //   console.log(pda);
    // });
  });

  it("decrypt vulnerability message", async () => {
    const pda = await program.account.vulnerability.fetch(vulnerability);

    const message = await Ed25519Ecies.decrypt(
      pda.message,
      encryption.secretKey
    );

    console.log("encryption secretKey : ", encryption.secretKey);

    console.log(message.toString());
  });

  // it("approve vulnerability", async () => {
  //   const protocolPda = await program.account.protocol.fetch(protocol);

  //   console.log(
  //     `protocol have ${protocolPda.vulnerabilities.toNumber()} vulnerabilities`
  //   );

  //   const vulnerability = PublicKey.findProgramAddressSync(
  //     // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
  //     [
  //       Buffer.from("vulnerability"),
  //       protocol.toBytes(),
  //       protocolPda.vulnerabilities.toArrayLike(Buffer, "le", 8),
  //       seed.toArrayLike(Buffer, "le", 8),
  //     ],
  //     program.programId
  //   )[0];

  //   await program.methods
  //     .approveVulnerability()
  //     .accounts({
  //       owner: owner.publicKey,
  //       protocol,
  //       vulnerability,
  //       analytics,
  //     })
  //     .signers([owner])
  //     .rpc()
  //     .then(confirmTx);
  // });

  // it("deposit hacked funds", async () => {
  //   const protocolPda = await program.account.protocol.fetch(protocol);

  //   const vulnerability = PublicKey.findProgramAddressSync(
  //     // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
  //     [
  //       Buffer.from("vulnerability"),
  //       protocol.toBytes(),
  //       protocolPda.vulnerabilities.toArrayLike(Buffer, "le", 8),
  //       seed.toArrayLike(Buffer, "le", 8),
  //     ],
  //     program.programId
  //   )[0];

  //   await program.methods
  //     .depositSolHack(amount)
  //     .accounts({
  //       signer: signer.publicKey,
  //       payout: payout.publicKey,
  //       protocol,
  //       vulnerability,
  //       hack,
  //       vault,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([signer])
  //     .rpc()
  //     .then(confirmTx)
  //     .then(async () => {
  //       console.log(
  //         "new vault balance : ",
  //         (await connection.getBalance(vault)) / LAMPORTS_PER_SOL + " sol"
  //       );
  //     });
  // });

  // it("approve hack", async () => {
  //   await program.methods
  //     .approveSolHack()
  //     .accounts({
  //       owner: owner.publicKey,
  //       payout: payout.publicKey,
  //       protocol,
  //       hack,
  //       auth,
  //       vault,
  //       fees: whvault,
  //       analytics,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([owner])
  //     .rpc()
  //     .then(confirmTx)
  //     .then(async () => {
  //       console.log(
  //         "new vault balance : ",
  //         (await connection.getBalance(vault)) / LAMPORTS_PER_SOL + " sol"
  //       );
  //       console.log(
  //         "new payout balance : ",
  //         (await connection.getBalance(payout.publicKey)) / LAMPORTS_PER_SOL +
  //           " sol"
  //       );
  //       console.log(
  //         "whitehat fees earned : ",
  //         (await connection.getBalance(whvault)) / LAMPORTS_PER_SOL + " sol"
  //       );
  //     });
  // });

  // it("claim sol", async () => {
  //   await program.methods
  //     .claimSol(new BN(9 * LAMPORTS_PER_SOL))
  //     .accounts({
  //       owner: owner.publicKey,
  //       protocol,
  //       auth,
  //       vault,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([owner])
  //     .rpc()
  //     .then(confirmTx)
  //     .then(async () => {
  //       console.log(
  //         "new vault balance : ",
  //         (await connection.getBalance(vault)) / LAMPORTS_PER_SOL + " sol"
  //       );
  //       console.log(
  //         "new owner balance : ",
  //         (await connection.getBalance(owner.publicKey)) / LAMPORTS_PER_SOL +
  //           " sol"
  //       );
  //     });
  // });

  // it("displays analytics", async () => {
  //   const [{ account }] = await program.account.analytics.all();
  //   console.log("protocols registered : ", account.protocols.toNumber());
  //   console.log(
  //     "total valid vulnerabilities : ",
  //     account.vulnerabilities.toNumber()
  //   );
  //   console.log("total valid hacks : ", account.hacks.toNumber());
  //   console.log(
  //     "sol recovered : ",
  //     account.solRecovered.toNumber() / LAMPORTS_PER_SOL
  //   );
  //   console.log(
  //     "sol paid to hackers : ",
  //     account.solPaid.toNumber() / LAMPORTS_PER_SOL
  //   );
  //   console.log("fees earned : ", account.fees.toNumber() / LAMPORTS_PER_SOL);
  // });

  // it("delete vulnerability", async () => {
  //   const protocolPda = await program.account.protocol.fetch(protocol);
  //   // console.log(protocolPda.vulnerabilities.toNumber());

  //   const vulnerability = PublicKey.findProgramAddressSync(
  //     // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
  //     [
  //       Buffer.from("vulnerability"),
  //       protocol.toBytes(),
  //       protocolPda.vulnerabilities.toArrayLike(Buffer, "le", 8),
  //       seed.toArrayLike(Buffer, "le", 8),
  //     ],
  //     program.programId
  //   )[0];

  //   await program.methods
  //     .deleteVulnerability()
  //     .accounts({
  //       admin: admin.publicKey,
  //       protocol,
  //       vulnerability,
  //       analytics,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([admin])
  //     .rpc()
  //     .then(confirmTx);
  // });

  // it("delete protocol", async () => {
  //   await program.methods
  //     .deleteProtocol()
  //     .accounts({
  //       admin: admin.publicKey,
  //       protocol,
  //       analytics,
  //       systemProgram: SystemProgram.programId,
  //     })
  //     .signers([admin])
  //     .rpc()
  //     .then(confirmTx);
  // });
});

const confirmTx = async (signature: string) => {
  const latestBlockhash = await anchor
    .getProvider()
    .connection.getLatestBlockhash();
  await anchor.getProvider().connection.confirmTransaction(
    {
      signature,
      ...latestBlockhash,
    },
    commitment
  );
};
