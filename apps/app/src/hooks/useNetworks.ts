import { NETWORK, PRIZE_POOLS } from '@shared/utilities'
import { SUPPORTED_NETWORKS } from '@constants/config'

/**
 * Returns currently selected SUPPORTED_NETWORKS
 * @returns
 */
export const useNetworks = (): NETWORK[] => {

  const networksWithPrizePools = PRIZE_POOLS.map((pool) => pool.chainId)


  return SUPPORTED_NETWORKS.mainnets.filter((network) => networksWithPrizePools.includes(network))
}