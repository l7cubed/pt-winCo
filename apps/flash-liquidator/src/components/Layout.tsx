import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useScreenSize } from '@shared/generic-react-hooks'
import { Toaster } from '@shared/ui'
import classNames from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = (props: LayoutProps) => {
  const { children, className } = props

  return (
    <div className='flex flex-col min-h-screen overflow-x-hidden'>
      <Head>
        <title>Cabana Flash Liquidator</title>
      </Head>

      <SimpleNavbar />

      <Toaster />

      <main
        className={classNames(
          'w-full min-h-[calc(100vh-16rem)] relative flex flex-col items-center mx-auto py-10 md:py-0 lg:px-4',
          className
        )}
      >
        {children}
      </main>

      <SimpleFooter />
    </div>
  )
}

interface SimpleNavbarProps {
  className?: string
}

const SimpleNavbar = (props: SimpleNavbarProps) => {
  const { className } = props

  const { isDesktop } = useScreenSize()

  return (
    <div
      className={classNames(
        'flex flex-col gap-6 items-center justify-between px-12 py-6 z-30 md:h-36 md:flex-row md:py-0',
        className
      )}
    >
      <Link href='/'>
        <Image
          src='/cabanaLogo.svg'
          alt='Cabana Logo'
          width={177}
          height={60}
          priority={true}
          className='w-52 h-auto'
        />
      </Link>
      <ConnectButton
        showBalance={isDesktop}
        chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
        accountStatus='full'
      />
    </div>
  )
}

interface SimpleFooterProps {
  className?: string
}

const SimpleFooter = (props: SimpleFooterProps) => {
  const { className } = props

  return (
    <footer
      className={classNames(
        'flex flex-col gap-6 items-center mt-auto p-6 overflow-hidden z-20 lg:h-28 lg:flex-row lg:gap-0 lg:p-0',
        className
      )}
    >
      <div className='lg:absolute lg:right-8'>
      </div>
    </footer>
  )
}
