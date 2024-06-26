import { TokenIcon } from '@shared/react-components'
import { NETWORK, NOUNS_TOKEN_ADDRESSES } from '@shared/utilities'
import classNames from 'classnames'
import { Address } from 'viem'
import { SimpleBadge } from '@components/SimpleBadge'
import { V4MigrationsTable } from './V4MigrationsTable'

export interface V4MigrationsProps {
  userAddress: Address
  showPooly?: boolean
  className?: string
}

export const V4Migrations = (props: V4MigrationsProps) => {
  const { userAddress, showPooly, className } = props

  return (
    <section className={classNames('w-full flex flex-col gap-6 items-center', className)}>
      <V4Badge />
      <V4MigrationsTable userAddress={userAddress} showPooly={showPooly} />
    </section>
  )
}

const V4Badge = () => (
  <SimpleBadge>
    <TokenIcon
      token={{ chainId: NETWORK.mainnet, address: NOUNS_TOKEN_ADDRESSES[NETWORK.mainnet] }}
    />
    V4 Pools
  </SimpleBadge>
)
