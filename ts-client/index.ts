import { IDL } from "./idl/whitehat";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";

import {
  Address,
  AnchorProvider,
  BN,
  Program,
  Wallet,
} from "@coral-xyz/anchor";
import fs from "fs";
import { Ed25519Ecies } from "@whitehat-xyz/ed25519-ecies";
import { PROGRAM_ID } from "./constants";
import nacl from "tweetnacl";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

const connection = new Connection("https://api.devnet.solana.com");

const re = /([0-9]|[A-z]){44}/;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const main = async () => {
  const arg = process.argv.slice(2);

  for (let i = 0; i < arg.length; ++i) {
    console.log(`index ${i} argument -> ${arg[i]}`);
  }

  switch (arg[0]) {
    // USAGE : encrypt message.txt pubkey
    case "encrypt": {
      try {
        const file = process.argv[1];
        const msg = fs.readFileSync(file, {
          encoding: "utf8",
          flag: "r",
        });
        const text = await Ed25519Ecies.encrypt(
          Buffer.from(msg),
          new PublicKey(process.argv[2]).toBuffer()
        );
        console.log(text);
      } catch (error) {
        console.log(error);
      }

      break;
    }
    // USAGE : decrypt keypair.json message.txt
    case "decrypt": {
      console.log("hello from decrypt !");
      if (arg[1].endsWith(".json")) {
        try {
          const secrets = fs
            .readFileSync(arg[1], "utf8")
            .split("[")[1]
            .split(",");

          const arr: number[] = [];

          secrets.forEach((secret) => {
            arr.push(
              parseInt(
                secret.replace(" ", "").replace("\n", "").replace("]", "")
              )
            );
          });

          console.log("keypair length : ", arr.length);

          console.log(arr, typeof arr);
          const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
          console.log(`welcome ${keypair.publicKey}`);
          //   const verified = nacl.sign.detached.verify(
          //     new TextEncoder().encode("whitehat"),
          //     bs58.decode(signature),
          //     bs58.decode(public_key)
          //   );
        } catch (error) {
          console.log(error);
        }
      }
      break;
    }
    // USAGE : report keypair.json message.(what|txt) pda payout
    case "report": {
      const connection = new Connection("https://api.devnet.solana.com");

      if (arg[1].endsWith(".json")) {
        try {
          const secrets = fs
            .readFileSync(arg[1], "utf8")
            .split("[")[1]
            .split(",");

          const arr: number[] = [];

          secrets.forEach((secret) => {
            arr.push(
              parseInt(
                secret.replace(" ", "").replace("\n", "").replace("]", "")
              )
            );
          });

          console.log("keypair length : ", arr.length);
          const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
          console.log(`welcome ${keypair.publicKey}`);
          const provider = new AnchorProvider(connection, new Wallet(keypair), {
            commitment: "confirmed",
          });
          const program = new Program(IDL, PROGRAM_ID as Address, provider);

          if (arg[2].endsWith(".txt")) {
            console.log("text unencrypted, encrypting..");
            const file = arg[2];
            const msg = fs.readFileSync(file, {
              encoding: "utf8",
              flag: "r",
            });
            const text = await Ed25519Ecies.encrypt(
              Buffer.from(msg),
              new PublicKey(process.argv[2]).toBuffer()
            );
            console.log(`text encrypted for ${process.argv[2]} !`);
            console.log(text);
            console.log("building vulnerability..");
            const seed = new BN(getRandomInt(1337));

            const protocol = new PublicKey(arg[3]);
            // @ts-ignore
            const protocolPda = await program.account.protocol.fetch(protocol);

            const vulnerability = PublicKey.findProgramAddressSync(
              // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
              [
                Buffer.from("vulnerability"),
                protocol.toBytes(),
                new BN(protocolPda.vulnerabilities.toNumber() + 1).toArrayLike(
                  Buffer,
                  "le",
                  8
                ),
                seed.toArrayLike(Buffer, "le", 8),
              ],
              program.programId
            )[0];

            const tx = await program.methods
              .reportVulnerability(
                Buffer.from(text),
                new BN(protocolPda.vulnerabilities.toNumber() + 1),
                seed
              )
              .accounts({
                signer: keypair.publicKey,
                payout: new PublicKey(arg[4]),
                protocol,
                vulnerability,
                systemProgram: SystemProgram.programId,
              })
              .signers([keypair])
              .rpc();
            console.log(`success! check out your tx here:
      https://explorer.solana.com/tx/${tx}?cluster=devnet`);
          } else if (arg[2].endsWith(".what")) {
            const file = arg[2];
            console.log("text encrypted, converting to buffer..");
            const bytes = fs
              .readFileSync(file, "utf8")
              .split("[")[1]
              .split(",");

            const arr: number[] = [];

            bytes.forEach((byte) => {
              arr.push(
                parseInt(
                  byte.replace(" ", "").replace("\n", "").replace("]", "")
                )
              );
            });
            console.log("building vulnerability..");
            const seed = new BN(getRandomInt(1337));

            const protocol = new PublicKey(arg[3]);
            // @ts-ignore
            const protocolPda = await program.account.protocol.fetch(protocol);

            const vulnerability = PublicKey.findProgramAddressSync(
              // b"vulnerability", protocol.key().as_ref(), id.to_le_bytes().as_ref(), seed.to_le_bytes().as_ref()
              [
                Buffer.from("vulnerability"),
                protocol.toBytes(),
                new BN(protocolPda.vulnerabilities.toNumber() + 1).toArrayLike(
                  Buffer,
                  "le",
                  8
                ),
                seed.toArrayLike(Buffer, "le", 8),
              ],
              program.programId
            )[0];

            const tx = await program.methods
              .reportVulnerability(
                Buffer.from(new Uint8Array(arr)),
                new BN(protocolPda.vulnerabilities.toNumber() + 1),
                seed
              )
              .accounts({
                signer: keypair.publicKey,
                payout: new PublicKey(arg[4]),
                protocol,
                vulnerability,
                systemProgram: SystemProgram.programId,
              })
              .signers([keypair])
              .rpc();

            console.log(`success! check out your tx here:
      https://explorer.solana.com/tx/${tx}?cluster=devnet`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      break;
    }
    case "program": {
      if (arg[1].endsWith(".json")) {
        try {
          const secrets = fs
            .readFileSync(arg[1], "utf8")
            .split("[")[1]
            .split(",");

          const arr: number[] = [];

          secrets.forEach((secret) => {
            arr.push(
              parseInt(
                secret.replace(" ", "").replace("\n", "").replace("]", "")
              )
            );
          });

          console.log("keypair length : ", arr.length);

          console.log(arr, typeof arr);
          const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
          console.log(`welcome ${keypair.publicKey}`);

          //   const verified = nacl.sign.detached.verify(
          //     new TextEncoder().encode("whitehat"),
          //     bs58.decode(signature),
          //     bs58.decode(public_key)
          //   );
        } catch (error) {
          console.log(error);
        }
      }
      break;
    }
    case "deposit": {
      if (arg[1].endsWith(".json")) {
        try {
          const secrets = fs
            .readFileSync(arg[1], "utf8")
            .split("[")[1]
            .split(",");

          const arr: number[] = [];

          secrets.forEach((secret) => {
            arr.push(
              parseInt(
                secret.replace(" ", "").replace("\n", "").replace("]", "")
              )
            );
          });

          console.log("keypair length : ", arr.length);

          console.log(arr, typeof arr);
          const keypair = Keypair.fromSecretKey(new Uint8Array(arr));
          console.log(`welcome ${keypair.publicKey}`);

          //   const verified = nacl.sign.detached.verify(
          //     new TextEncoder().encode("whitehat"),
          //     bs58.decode(signature),
          //     bs58.decode(public_key)
          //   );
        } catch (error) {
          console.log(error);
        }
      }
      break;
    }
    default: {
      console.log(
        "usage :\nencrypt a message :\n\n./whitehat encrypt message.txt <DESTINATION_PUBKEY>\n\ndecrypt a message\n\n./whitehat decrypt keypair.json message.txt\n\nreport a vulnerability :\n\n./whitehat report keypair.json report.txt\n(returns your vulnerability pda pubkey, save it for later)"
      );
      break;
    }
  }
};

main();
