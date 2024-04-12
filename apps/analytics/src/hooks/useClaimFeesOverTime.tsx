import { PrizePool } from '@generationsoftware/hyperstructure-client-js'
import { NO_REFETCH } from '@shared/generic-react-hooks'
import { claimerABI, DEFAULT_CLAIMER_ADDRESSES, prizePoolABI } from '@shared/utilities'
import { useQueries } from '@tanstack/react-query'
import { useMemo } from 'react'
import { usePublicClient, useReadContract } from 'wagmi'

export const useClaimFeesOverTime = (prizePool: PrizePool, blockNumbers: bigint[]) => {
  const publicClient = usePublicClient({ chainId: prizePool.chainId })

  const claimerAddress = DEFAULT_CLAIMER_ADDRESSES[prizePool.chainId]

  const { data: numTiers } = useReadContract({
    chainId: prizePool.chainId,
    address: prizePool.address,
    abi: prizePoolABI,
    functionName: 'numberOfTiers',
    blockNumber: blockNumbers[0],
    query: { enabled: !!blockNumbers.length }
  })

  const results = useQueries({
    queries: blockNumbers.map((blockNumber) => {
      return {
        queryKey: ['computedClaimFee', prizePool.chainId, numTiers, blockNumber.toString()],
        queryFn: async () => {
          if (!!publicClient && !!numTiers) {
            return await publicClient.readContract({
              address: claimerAddress,
              abi: claimerABI,
              functionName: 'computeFeePerClaim',
              args: [numTiers - 2, 1n],
              blockNumber
            })
          }
        },
        enabled: !!publicClient && !!numTiers && !!claimerAddress,
        ...NO_REFETCH
      }
    })
  })

  return useMemo(() => {
    const isFetched = results?.every((result) => result.isFetched)

    const data: { [blockNumber: string]: bigint } = {}
    blockNumbers.forEach((blockNumber, i) => {
      const claimFee = results[i]?.data
      if (!!claimFee) {
        data[blockNumber.toString()] = claimFee
      }
    })

    return { isFetched, data }
  }, [results])
}
