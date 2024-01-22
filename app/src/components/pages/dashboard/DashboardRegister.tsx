import { useTranslation } from 'next-i18next'
import clsx from 'clsx'
import {
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  QueueListIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import {
  Fragment,
  useCallback,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  useContext,
} from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'
import { GPTModel, titleSchema, percentSchema } from '@/utils/form'

import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { format } from 'date-fns'
import useToastMessage from '@/hooks/useToastMessage'
import { Dialog, Transition } from '@headlessui/react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerProtocol } from '@/utils/api/instructions/registerProtocol'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_RPC_ENDPOINT } from '@/constants'
import { Connection, PublicKey, TransactionSignature } from '@solana/web3.js'
import { PROTOCOL_PDA } from '@/types'
import { Program } from '@coral-xyz/anchor'
import { IDL } from '@/idl'
import { WhitehatContext } from '@/contexts/WhitehatContextProvider'

export type ChatRoom = {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
  model: GPTModel
  maxTokens: number
  temperature: number
  context: string
  title: string
}

const schema = z.object({
  name: titleSchema,
  percent: percentSchema,
})

type Inputs = z.infer<typeof schema>

type Props = {
  program: Program<IDL> | null
  protocol: PROTOCOL_PDA | null
  setProtocol: React.Dispatch<
    React.SetStateAction<PROTOCOL_PDA | null>
  > | null
  setSelectedProgram: React.Dispatch<React.SetStateAction<PROTOCOL_PDA | null>>
  isNewChatModalOpen: boolean
  setNewChatModalOpen: (_value: boolean) => void
  currentChatRoomId: string | null
  setCurrentChatRoomId: (_value: string | null) => void
  chatList: ChatRoom[]
  setChatList: (_value: ChatRoom[]) => void
  lastChat: QueryDocumentSnapshot<DocumentData> | null
  setLastChat: (_value: QueryDocumentSnapshot<DocumentData> | null) => void
  isDataLoading: boolean
  setDataLoading: (_value: boolean) => void
}

export default function DashboardRegister({
  program,
  isNewChatModalOpen,
  setNewChatModalOpen,
}: Props) {
  const { t, i18n } = useTranslation()
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [isChatListModalOpen, setChatListModalOpen] = useState(true)
  const addToast = useToastMessage()
  const { publicKey, sendTransaction } = useWallet()
  const connection = useConnection()
  const { keypair } = useContext(WhitehatContext)
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      percent: 10,
    },
  })

  const chatMenuRef = useRef<HTMLDivElement>(null)
  const chatMenuRefMobile = useRef<HTMLDivElement>(null)

  const isDisabled = useMemo(() => {
    return isCreateLoading || errors.name != null || errors.percent != null
  }, [isCreateLoading, errors.name, errors.percent])

  const onSubmit = useCallback(
    async (data: Inputs) => {
      try {
        setCreateLoading(true)
        if (!isDisabled && publicKey && program && keypair) {
          const tx = await registerProtocol(
            publicKey,
            keypair.publicKey,
            data.name,
            data.percent,
            connection
          )

          const cnx = new Connection(SOLANA_RPC_ENDPOINT)
          let signature: TransactionSignature = ''
          signature = await sendTransaction(tx, cnx)
          await cnx.confirmTransaction(signature, 'confirmed')

          addToast({
            type: 'success',
            title: t(':programCreatedSuccessTitle'),
            description: t('dashboard:programCreatedSuccessBody'),
          })

          const protocol = PublicKey.findProgramAddressSync(
            [Buffer.from('protocol'), publicKey.toBytes()],
            program.programId
          )[0]

          // @ts-ignore
          const { account } = await program.account.protocol.fetch(protocol)
          console.log(account)
          // setCurrentChatRoomId(docRef.id)
          // setPrograms((prevState) => ({
          //   ...prevState,
          // }))
        }
      } catch (err) {
        console.error(err)
        if (
          err instanceof Error &&
          (err.message.includes('Firebase ID token has expired.') ||
            err.message.includes('Error: getUserAuth'))
        ) {
          addToast({
            type: 'error',
            title: t('errorTokenExpiredTitle'),
            description: t('errorTokenExpiredBody'),
          })
        } else {
          addToast({
            type: 'error',
            title: t('errorTitle'),
            description: t('errorBody'),
          })
        }
      } finally {
        setNewChatModalOpen(false)
        setCreateLoading(false)
      }
    },
    [isDisabled, publicKey, addToast, t, setNewChatModalOpen]
  )

  const onKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        await handleSubmit(onSubmit)()
      }
    },
    [handleSubmit, onSubmit]
  )

  return (
    <>
      <Transition show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setNewChatModalOpen(false)}
        >
          <div className="text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              show={true}
              as={Fragment}
            // enter="ease-out duration-300"
            // enterFrom="opacity-0 scale-95"
            // enterTo="opacity-100 scale-100"
            // leave="ease-in duration-200"
            // leaveFrom="opacity-100 scale-100"
            // leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-xl -translate-y-10 transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                <div className="flex w-full flex-col pb-8">
                  <div className="flex flex-row items-center justify-center p-4">
                    <LogoHorizontal className="w-24" />
                    <div className="flex-grow" />
                  </div>
                  <div className="flex flex-grow flex-col gap-2">
                    <p className="text-center text-lg font-bold">
                      {t('dashboard:registerProtocol')}
                    </p>
                    <div className="w-full sm:mx-auto sm:max-w-xl">
                      <div className="gap-6  sm:px-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="flex flex-col gap-6  py-6 sm:px-10">
                            <div>
                              <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                {t('dashboard:protocolName')}
                                {errors.name && (
                                  <span className="text-xs text-red-500 dark:text-red-300">
                                    {' : '}
                                    {t('chat:modelErrorText')}
                                  </span>
                                )}
                              </p>
                              <div className="mt-2">
                                <Controller
                                  name="name"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      onKeyDown={onKeyDown}
                                      className="w-full border-2 border-gray-900 p-3 text-lg font-bold text-gray-900 dark:border-gray-50 dark:bg-gray-800 dark:text-white sm:leading-6"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                {t('dashboard:percent')}
                                {errors.percent && (
                                  <span className="text-xs text-red-500 dark:text-red-300">
                                    {' : '}
                                    {t('dashboard:errorPercent')}
                                  </span>
                                )}
                              </p>
                              <div className="mt-2">
                                <Controller
                                  name="percent"
                                  control={control}
                                  render={({ field }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                        onChange={(e) =>
                                          field.onChange(
                                            e.target.value
                                              ? parseFloat(e.target.value)
                                              : 0
                                          )
                                        }
                                      />
                                      <p className="text-bold text-gray-900 dark:text-white">
                                        {field.value} %
                                      </p>
                                    </>
                                  )}
                                />
                              </div>
                            </div>
                            <div></div>
                            <div>
                              <button
                                type="submit"
                                disabled={isDisabled}
                                className={clsx(
                                  isDisabled
                                    ? 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                    : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200',
                                  'w-full px-3 py-2 text-center text-lg font-bold'
                                )}
                              >
                                {t('dashboard:register')}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/*TODO: fix show for mobile */}
      <Transition show={false} as={Fragment}>
        <Dialog
          as="div"
          ref={chatMenuRefMobile}
          // onScroll={handleScrollMobile}
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setChatListModalOpen(false)}
        >
          <div className="text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-xl -translate-y-10 transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                <div className="flex w-full flex-col pb-8">
                  <div className="flex flex-row items-center justify-center p-4">
                    <LogoHorizontal className="w-24" />
                    <div className="flex-grow" />
                  </div>
                  <div className="flex flex-grow flex-col gap-2">
                    <p className="text-center text-lg font-bold">
                      {t('dashboard:registerProtocol')}
                    </p>
                    <div className="w-full sm:mx-auto sm:max-w-xl">
                      <div className="gap-6  sm:px-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="flex flex-col gap-6  py-6 sm:px-10">
                            <div>
                              <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                {t('dashboard:protocolName')}
                                {errors.name && (
                                  <span className="text-xs text-red-500 dark:text-red-300">
                                    {' : '}
                                    {t('dashboard:protocolNameError')}
                                  </span>
                                )}
                              </p>
                              <div className="mt-2">
                                <Controller
                                  name="name"
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      onKeyDown={onKeyDown}
                                      className="w-full border-2 border-gray-900 p-3 text-lg font-bold text-gray-900 dark:border-gray-50 dark:bg-gray-800 dark:text-white sm:leading-6"
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                {t('dashboard:percent')}
                                {errors.percent && (
                                  <span className="text-xs text-red-500 dark:text-red-300">
                                    {' : '}
                                    {t('dashboard:errorPercent')}
                                  </span>
                                )}
                              </p>
                              <div className="mt-2">
                                <Controller
                                  name="percent"
                                  control={control}
                                  render={({ field }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={1}
                                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                                        onChange={(e) =>
                                          field.onChange(
                                            e.target.value
                                              ? parseFloat(e.target.value)
                                              : 0
                                          )
                                        }
                                      />
                                      <p className="text-bold text-gray-900 dark:text-white">
                                        {field.value} %
                                      </p>
                                    </>
                                  )}
                                />
                              </div>
                            </div>
                            <div></div>
                            <div>
                              <button
                                type="submit"
                                disabled={isDisabled}
                                className={clsx(
                                  isDisabled
                                    ? 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                    : 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200',
                                  'w-full px-3 py-2 text-center text-lg font-bold'
                                )}
                              >
                                {t('dashboard:register')}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
