import React, { createContext, useState, useEffect, useMemo } from 'react'
// import { onAuthStateChangeListener } from "@/tools/supabase";
import type { ReactNode } from 'react'
import type { PROTOCOL_PDA, SOL_HACK_PDA, VULNERABILITY_PDA } from '@/types'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Address, Program } from '@coral-xyz/anchor'
import { IDL } from '@/idl'
import { PROGRAM_ID } from '@/constants'
import { Keypair, PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'

interface WhitehatContext {
  program: Program<IDL> | null
  protocol: PROTOCOL_PDA | null
  setProtocol: React.Dispatch<
    React.SetStateAction<PROTOCOL_PDA | null>
  > | null
  vulnerability: VULNERABILITY_PDA[] | null
  setVulnerability: React.Dispatch<
    React.SetStateAction<VULNERABILITY_PDA[] | null>
  > | null
  pendingVulnerability: number
  solHacks: SOL_HACK_PDA[] | null
  setSolHacks: React.Dispatch<
    React.SetStateAction<SOL_HACK_PDA[] | null>
  > | null
  pendingHacks: number
  keypair: Keypair | null
}

export const WhitehatContext = createContext<WhitehatContext>({
  program: null,
  protocol: null,
  setProtocol: () => null,
  vulnerability: null,
  setVulnerability: () => null,
  pendingVulnerability: 0,
  solHacks: null,
  setSolHacks: () => null,
  pendingHacks: 0,
  keypair: null,
})

export const WhitehatProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey, signMessage } = useWallet()
  const connection = useConnection()
  const router = useRouter()
  const program = useMemo(
    () => new Program(IDL, PROGRAM_ID as Address, connection),
    [connection]
  )
  const [protocol, setProtocol] = useState<PROTOCOL_PDA | null>(null)
  const [vulnerability, setVulnerability] = useState<
    VULNERABILITY_PDA[] | null
  >(null)

  const [pendingVulnerability, setPendingVulnerability] = useState<number>(0)

  const [solHacks, setSolHacks] = useState<SOL_HACK_PDA[] | null>(null)
  const [pendingHacks, setPendingHacks] = useState<number>(0)

  const [keypair, setKeypair] = useState<Keypair | null>(null)

  const value = {
    program,
    protocol,
    setProtocol,
    vulnerability,
    setVulnerability,
    pendingVulnerability,
    solHacks,
    setSolHacks,
    pendingHacks,
    keypair,
  }

  useEffect(() => {
    if (publicKey && !protocol) {
      const pda = PublicKey.findProgramAddressSync(
        [Buffer.from('protocol'), publicKey.toBytes()],
        program.programId
      )[0]
      const fetchProtocol = async () => {
        // @ts-ignore
        return await program.account.protocol.fetch(pda)
      }
      fetchProtocol()
        .then((response) => {
          console.log(response)
          // @ts-ignore
          const programsMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          setProtocol(programsMap)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [publicKey])

  useEffect(() => {
    if (publicKey && protocol) {
      const fetchVulnerabilities = async () => {
        // @ts-ignore
        return await program.account.vulnerability.all([
          {
            memcmp: {
              offset: 8,
              bytes: protocol.pubkey.toBase58(),
            },
          },
        ])
      }
      fetchVulnerabilities()
        .then((response) => {
          // @ts-ignore
          const vulnerabilitiesMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          console.log('vulnerabilities', vulnerabilitiesMap)
          setVulnerability(vulnerabilitiesMap)
        })
        .catch((error) => console.log(error))
    }
  }, [publicKey, protocol])

  useEffect(() => {
    if (vulnerability && vulnerability.length > 0) {
      const pendingCount = vulnerability.reduce((count, { reviewed }) => {
        if (reviewed === false) {
          return count + 1
        } else {
          return count
        }
      }, 0)
      setPendingVulnerability(pendingCount)
      console.log('pending vulnerabilities : ', pendingCount)
    }
  }, [vulnerability])

  useEffect(() => {
    if (publicKey && protocol) {
      const fetchHacks = async () => {
        // @ts-ignore
        return await program.account.solHack.all([
          {
            memcmp: {
              offset: 8,
              bytes: protocol.pubkey.toBase58(),
            },
          },
        ])
      }
      fetchHacks()
        .then((response) => {
          // @ts-ignore
          const hacksMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          console.log('sol hacks', hacksMap)
          setSolHacks(hacksMap)
        })
        .catch((error) => console.log(error))
    }
  }, [publicKey, protocol])

  useEffect(() => {
    if (solHacks && solHacks.length > 0) {
      const pendingCount = solHacks.reduce((count, { reviewed }) => {
        if (reviewed === false) {
          return count + 1
        } else {
          return count
        }
      }, 0)

      setPendingHacks(pendingCount)
      console.log('pending hacks : ', pendingCount)
    }
  }, [solHacks])

  useEffect(() => {
    if (
      publicKey &&
      !keypair &&
      signMessage &&
      router.pathname.includes('dashboard' || 'vulnerabilities' || 'hacks')
    ) {
      const buidlKeypair = async () => {
        const enc = new TextEncoder()
        const message = await signMessage(enc.encode('whitehat'))
        console.log('signed message : ', message)
        return message
      }
      buidlKeypair()
        .then((message) => {
          const kp = Keypair.fromSeed(message.slice(0, 32))
          console.log(kp.publicKey.toBase58())
          setKeypair(kp)
        })
        .catch((err) => console.log(err))
    }
    console.log(keypair?.publicKey.toBase58())
  }, [publicKey, router])

  return (
    <WhitehatContext.Provider value={value}>
      {children}
    </WhitehatContext.Provider>
  )
}
