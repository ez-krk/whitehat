import Image from 'next/image'
import logoHorizontal from '@/assets/img/logo/whitehat.webp'
import clsx from 'clsx'

type Props = {
  className?: string
  onClick?: () => void
}

export default function LogoNavbar({ className, ...rest }: Props) {
  return (
    <>
      <div {...rest}>
        <span className="sr-only">whitehat</span>
        <div className="flex items-center">
          <Image
            src={logoHorizontal}
            alt="Skeet Framework"
            className={clsx('dark:hidden ', className)}
            unoptimized
          />
        </div>
        <div className="flex items-center">
          <Image
            src={logoHorizontal}
            alt="Skeet Framework"
            className={clsx('hidden dark:block', className)}
            unoptimized
          />
        </div>
      </div>
    </>
  )
}
