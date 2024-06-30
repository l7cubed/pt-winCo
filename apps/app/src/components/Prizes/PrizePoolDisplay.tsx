import { useSelectedVault, useSelectedVaults } from '@generationsoftware/hyperstructure-react-hooks'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { ExternalLink } from '@shared/ui'
import { LINKS, NETWORK } from '@shared/utilities'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'
import { PrizePoolPrizesCard } from './PrizePoolPrizesCard'

interface PrizePoolDisplayProps {
  className?: string
}

export const PrizePoolDisplay = (props: PrizePoolDisplayProps) => {
  const { className } = props

  const t = useTranslations('Prizes')

  return (
    <div className={classNames('flex flex-col items-center text-center', className)}>
      <PrizePoolCarousel className='-mt-1 mb-4' />
      <span>
        *
        {t.rich('learnMore', {
          link: (chunks) => (
            <ExternalLink
              href={LINKS.protocolBasicsDocs}
              size='xs'
              className='text-pt-purple-200 md:text-base'
              iconClassName='md:h-5 md:w-5'
            >
              {chunks}
            </ExternalLink>
          )
        })}
      </span>
    </div>
  )
}

interface PrizePoolCarouselProps {
  className?: string
}

// TODO: animate between different prize pools
const PrizePoolCarousel = (props: PrizePoolCarouselProps) => {
  const { className } = props

  const router = useRouter()

  const [prizePoolIndex, setPrizePoolIndex] = useState<number>(0)

  const prizePools = useSupportedPrizePools()
  const prizePoolsArray = Object.values(prizePools)

  const { vaults } = useSelectedVaults()
  const { setSelectedVaultById } = useSelectedVault()

  const handleNetworkChange = (chainId: number) => {
    if (!!chainId && chainId in NETWORK) {
      const vaultsArray = Object.values(vaults.vaults)
      const firstVaultInChain = vaultsArray.find((vault) => vault.chainId === chainId)
      !!firstVaultInChain && setSelectedVaultById(firstVaultInChain.id)
    }
  }

  useEffect(() => {
    const rawUrlNetwork = router.query['network']
    const chainId =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined
    if (!!chainId) {
      handleNetworkChange(chainId)
      const prizePoolIndex = prizePoolsArray.findIndex((pool) => pool.chainId === chainId)
      prizePoolIndex !== -1 && setPrizePoolIndex(prizePoolIndex)
    }
  }, [router])

  useEffect(() => {
    const chainId = prizePoolsArray[prizePoolIndex]?.chainId
    !!chainId && handleNetworkChange(chainId)
  }, [prizePoolIndex])

  const prevPrizePoolIndex = prizePoolIndex === 0 ? prizePoolsArray.length - 1 : prizePoolIndex - 1
  const nextPrizePoolIndex = prizePoolIndex === prizePoolsArray.length - 1 ? 0 : prizePoolIndex + 1

  return (
    <div
      className={classNames(
        'relative w-screen flex justify-center gap-1 overflow-hidden',
        className
      )}
    >
      <PrizePoolPrizesCard
        prizePool={prizePoolsArray[prizePoolIndex]}
        className='w-[calc(50vw-4rem)] shrink-0 lg:w-[48rem]'
      />
    </div>
  )
}
