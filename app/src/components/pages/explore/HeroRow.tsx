import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import { PROTOCOL_PDA } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Address, Program } from '@coral-xyz/anchor'
import { IDL } from '@/idl'
import { PROGRAM_ID } from '@/constants'
import { ellipsis } from '@/utils/ellipsis'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import {
  BugAntIcon,
  ClockIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'

export default function HomeHeroRow() {
  const { t } = useTranslation()

  const { publicKey } = useWallet()
  const connection = useConnection()

  const [programs, setPrograms] = useState<PROTOCOL_PDA[] | null>(null)

  const program = useMemo(
    () => new Program(IDL, PROGRAM_ID as Address, connection),
    [connection]
  )
  useEffect(() => {
    if (publicKey && !programs) {
      const fetchPrograms = async () => {
        // @ts-ignore
        return await program.account.protocol.all()
      }
      fetchPrograms()
        .then((response) => {
          console.log(response)
          // @ts-ignore
          const programsMap = response.map(({ account, publicKey }) => {
            const result = account
            account.pubkey = publicKey
            return result
          })
          console.log(programsMap)
          setPrograms(programsMap)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [publicKey])

  return (
    <>
      <Container className="pb-40 pt-24 text-center lg:pb-64 lg:pt-40">
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-7xl">
          hack with impunity *
        </h1>

        {publicKey ? (
          <div className="mt-6 lg:mt-8">
            {programs && programs.length > 0 ? (
              <div className="overflow-x-auto">
                {programs.map((program: PROTOCOL_PDA) => {
                  console.log('deposit vault :', program.vault.toString())
                  return (
                    <div
                      className="mt-2 flex w-[100%] flex-col border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-50 dark:border-white dark:text-gray-50 dark:hover:bg-green-50 dark:hover:text-gray-50 hover:dark:text-gray-900"
                      key={program.pubkey.toString()}
                    >
                      <div className="flex w-[100%] items-center justify-between px-2">
                        <div className="flex items-center justify-center space-x-2 p-2 ">
                          <div className="placeholder avatar">
                            <div className="w-12 rounded-full bg-neutral text-neutral-content">
                              <span>MX</span>
                            </div>
                          </div>
                          <div>{program.name}</div>
                        </div>

                        <div className="flex flex-col items-end justify-end">
                          <div>
                            <span className="text-xs">hack it for</span>{' '}
                            <span className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text font-bold text-transparent">
                              {program.percent.toNumber()} %
                            </span>
                            <span className="text-xl">*</span>
                          </div>
                          <div className="font-bold">
                            {program.paid.toNumber() / LAMPORTS_PER_SOL} ◎ paid
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto w-[95%] border-t border-accent pt-2" />

                      <div className="flex w-[100%] items-center space-x-2 px-2 pb-2">
                        <div className="flex">
                          <BugAntIcon className="h-6 w-6" />
                          <span className="ml-1">
                            {program.vulnerabilities.toNumber()}
                          </span>
                        </div>
                        <div className="flex">
                          <CommandLineIcon className="h-6 w-6" />
                          <span className="ml-1">
                            {program.hacks.toNumber()}
                          </span>
                        </div>
                        <div className="flex">
                          <ClockIcon className="h-6 w-6" />
                          <span className="ml-1">2 days</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <p className="mx-auto mt-8 max-w-2xl text-lg tracking-tight text-gray-700 dark:text-gray-200">
                  * {t('explore:HeroRow.body')}
                </p>
                {/* <table className="table">
                  <thead className="text-gray-900 dark:text-gray-50">
                    <tr>
                      <th className="text-center">%</th>
                      <th className="text-center">protocol name</th>
                      <th className="text-center">owner</th>
                      <th className="text-center">pda address</th>
                      <th className="text-center">deposit vault</th>
                      <th className="text-center">encryption pubkey</th>
                      <th className="text-center">vulnerabilities</th>
                      <th className="text-center">hacks</th>
                      <th className="text-center">paid to hackers</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900 dark:text-gray-50">
                    {programs.map((program: PROTOCOL_PDA) => {
                      console.log('deposit vault :', program.vault.toString())
                      return (
                        <tr key={program.pubkey.toString()}>
                          <th className="text-center">
                            {program.percent.toNumber()} %
                          </th>
                          <td className="text-center">{program.name}</td>
                          <td>
                            <span className="flex items-center justify-center">
                              <Tooltip text={`${program.owner.toString()}`}>
                                {ellipsis(program.owner.toString())}
                              </Tooltip>
                            </span>
                          </td>
                          <td>
                            <span className="flex items-center justify-center">
                              <Tooltip text={`${program.pubkey.toString()}`}>
                                {ellipsis(program.pubkey.toString())}
                              </Tooltip>
                            </span>
                          </td>
                          <td>
                            <span className="flex items-center justify-center">
                              <Tooltip text={`${program.vault.toString()}`}>
                                {ellipsis(program.vault.toString())}
                              </Tooltip>
                            </span>
                          </td>
                          <td>
                            <span className="flex items-center justify-center">
                              <Tooltip
                                text={`${program.encryption.toString()}`}
                              >
                                {ellipsis(program.encryption.toString())}
                              </Tooltip>
                            </span>
                          </td>
                          <td className="text-center">
                            {program.vulnerabilities.toNumber()}
                          </td>
                          <td className="text-center">
                            {program.hacks.toNumber()}
                          </td>
                          <td className="text-center">
                            {program.paid.toNumber() / LAMPORTS_PER_SOL}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table> */}
              </div>
            ) : (
              <div>something went wrong</div>
            )}
          </div>
        ) : (
          <WalletMultiButton />
        )}
      </Container>
    </>
  )
}
