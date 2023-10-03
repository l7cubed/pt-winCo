import { PrizePoolBadge } from '@shared/react-components'
import { NETWORK } from '@shared/utilities'
import { GrandPrize } from '@components/GrandPrize'
import { Header } from '@components/Header'
import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout>
      <Header />
      <PrizePoolBadge chainId={NETWORK.optimism} className='mt-8' />
      <GrandPrize chainId={NETWORK.optimism} className='mt-6' />
    </Layout>
  )
}
