import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useToastMessage from '@/hooks/useToastMessage'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { useTranslation } from 'next-i18next'
import DashboardMenu from './DashboardMenu'
import DashboardBox from './DashboardBox'
import { PROTOCOL_PDA, SOL_HACK_PDA, VULNERABILITY_PDA } from '@/types'
import { WhitehatContext } from '@/contexts/WhitehatContextProvider'
import { useWallet } from '@solana/wallet-adapter-react'
import DashboardRegister from './DashboardRegister'

export default function DashboardScreen() {
  const { t } = useTranslation()

  const addToast = useToastMessage()

  const { publicKey } = useWallet()

  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  )

  const [selectedProgram, setSelectedProgram] = useState<PROTOCOL_PDA | null>(
    null
  )

  const [chatList, setChatList] = useState<any[]>([])

  const [lastChat, setLastChat] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [isDataLoading, setDataLoading] = useState(false)

  const {
    program,
    protocol,
    setProtocol,
    pendingVulnerability,
    pendingHacks,
  } = useContext(WhitehatContext)

  return (
    <>
      <div className="content-height flex w-full flex-col items-start justify-start overflow-auto sm:flex-row">
        {publicKey && protocol && protocol.programs.length > 0 ? (
          <>
            <DashboardMenu
              program={program}
              protocol={protocol}
              setProtocol={setProtocol}
              setSelectedProgram={setSelectedProgram}
              isNewChatModalOpen={isNewChatModalOpen}
              setNewChatModalOpen={setNewChatModalOpen}
              currentChatRoomId={currentChatRoomId}
              setCurrentChatRoomId={setCurrentChatRoomId}
              chatList={chatList}
              setChatList={setChatList}
              lastChat={lastChat}
              setLastChat={setLastChat}
              isDataLoading={isDataLoading}
              setDataLoading={setDataLoading}
            />
            <DashboardBox
              protocol={protocol}
              selectedProgram={selectedProgram}
              pendingVulnerability={pendingVulnerability}
              pendingHacks={pendingHacks}
              currentChatRoomId={currentChatRoomId}
            />
          </>
        ) : (
          <DashboardRegister
            program={program}
            protocol={protocol}
            setProtocol={setProtocol}
            setSelectedProgram={setSelectedProgram}
            isNewChatModalOpen={isNewChatModalOpen}
            setNewChatModalOpen={setNewChatModalOpen}
            currentChatRoomId={currentChatRoomId}
            setCurrentChatRoomId={setCurrentChatRoomId}
            chatList={chatList}
            setChatList={setChatList}
            lastChat={lastChat}
            setLastChat={setLastChat}
            isDataLoading={isDataLoading}
            setDataLoading={setDataLoading}
          />
        )}
      </div>
    </>
  )
}
