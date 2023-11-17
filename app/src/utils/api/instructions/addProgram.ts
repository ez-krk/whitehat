import { PROGRAM_ID } from '@/constants'
import { IDL } from '@/idl'
import { Address, BN, Program } from '@coral-xyz/anchor'
import { ConnectionContextState } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

export const addProgram = async (
  owner: PublicKey,
  programData: PublicKey,
  connection: ConnectionContextState
): Promise<Transaction> => {
  const program = new Program(IDL, PROGRAM_ID as Address, connection)

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from('protocol'), owner.toBytes()],
    program.programId
  )[0]

  console.log('protocol : ', protocol.toString())

  const analytics = PublicKey.findProgramAddressSync(
    [Buffer.from('analytics')],
    program.programId
  )[0]

  return await program.methods
    .addProgram()
    .accounts({
      owner,
      programData,
      protocol,
      analytics,
      systemProgram: SystemProgram.programId,
    })
    .transaction()
}
