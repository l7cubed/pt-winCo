import {
  useGrandPrize,
  usePrizePool,
  usePrizeTokenPrice
} from '@generationsoftware/hyperstructure-react-hooks'
import { CurrencyValue } from '@shared/react-components'
import { LINKS, Spinner } from '@shared/ui'
import { NETWORK, PRIZE_POOLS } from '@shared/utilities'
import classNames from 'classnames'
import Link from 'next/link'
import { formatUnits } from 'viem'

interface GrandPrizeProps {
  chainId: number
  className?: string
}

export const GrandPrize = (props: GrandPrizeProps) => {
  const { chainId, className } = props

  const prizePoolInfo = PRIZE_POOLS.find((pool) => pool.chainId === chainId) as {
    chainId: NETWORK
    address: `0x${string}`
    options: {
      prizeTokenAddress: `0x${string}`
      drawPeriodInSeconds: number
      tierShares: number
    }
  }
  const prizePool = usePrizePool(chainId, prizePoolInfo.address, prizePoolInfo.options)
  const { data: grandPrize } = useGrandPrize(prizePool, { useCurrentPrizeSizes: true })
  const { data: prizeToken } = usePrizeTokenPrice(prizePool)

  const gpValue =
    !!grandPrize && !!prizeToken?.price
      ? parseFloat(formatUnits(grandPrize.amount, grandPrize.decimals)) * prizeToken.price
      : undefined

  return (
    <div
      className={classNames(
        'w-full flex flex-col items-center text-center text-pt-pink',
        className
      )}
    >
      <span className='text-2xl'>Grand Prize</span>
      <span className='font-grotesk font-bold text-5xl'>
        {!!gpValue ? <CurrencyValue baseValue={gpValue} hideZeroes={true} /> : <Spinner />}
      </span>
      <Link
        href={`${LINKS.app}/prizes?network=${chainId}`}
        target='_blank'
        className='mt-2 text-pt-purple-100'
      >
        See All Prizes
      </Link>
    </div>
  )
}
