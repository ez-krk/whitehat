import { useState, useEffect, type ReactNode } from 'react'
import Link from '@/components/routing/Link'
import clsx from 'clsx'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

type Props = {
  children: ReactNode | string
  text: string
}

export default function Popover({ children, text, ...props }: Props) {
  const [isShown, setIsShown] = useState(false)

  return (
    <>
      {children}
      <div
        className="tooltip flex items-center justify-center"
        data-tip={`${text}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      ></div>
    </>
  )
}
