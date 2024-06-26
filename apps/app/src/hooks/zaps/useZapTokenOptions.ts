import {
  useAllUserVaultBalances,
  useAllVaultSharePrices,
  useCachedVaultLists,
  useSelectedVault,
  useTokenBalances,
  useTokenPrices,
  useTokens,
  useVaults
} from '@generationsoftware/hyperstructure-react-hooks'
import { TokenWithAmount, TokenWithPrice } from '@shared/types'
import { DOLPHIN_ADDRESS, getVaultId, lower, NETWORK } from '@shared/utilities'
import { useMemo } from 'react'
import { Address, formatUnits } from 'viem'
import { useAccount } from 'wagmi'

// TODO: should not hardcode token options (fetch from some existing tokenlist - paraswap would be ideal)
const zapTokenOptions: { [chainId: number]: Address[] } = {
  [NETWORK.base]: [
    DOLPHIN_ADDRESS, // ETH
    '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
    '0x940181a94A35A4569E4529A3CDfB74e38FD98631', // AERO
    '0xd652C5425aea2Afd5fb142e120FeCf79e18fafc3', // POOL
    '0x4200000000000000000000000000000000000006', // WETH
    '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452', // wstETH
    '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22', // cbETH
    '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
    '0x368181499736d0c0CC614DBB145E2EC1AC86b8c6', // LUSD
    '0x0000206329b97DB379d5E1Bf586BbDB969C63274' // USDA
  ]
}

/**
 * Returns token options to use for zap transactions
 * @param chainId the chain ID the zap is to be made in
 * @returns
 */
export const useZapTokenOptions = (chainId: number) => {
  const { address: userAddress } = useAccount()

  const tokenAddresses = zapTokenOptions[chainId] ?? []
  const { data: tokens } = useTokens(chainId, tokenAddresses)
  const { data: tokenBalances } = useTokenBalances(
    chainId,
    userAddress as Address,
    tokenAddresses,
    { refetchOnWindowFocus: true }
  )
  const { data: tokenPrices } = useTokenPrices(chainId, tokenAddresses)

  const { vault } = useSelectedVault()
  const { cachedVaultLists } = useCachedVaultLists()
  const vaults = useVaults(
    cachedVaultLists['default']?.tokens.filter((t) => t.chainId === chainId) ?? []
  )
  const { data: vaultBalances } = useAllUserVaultBalances(vaults, userAddress as Address, {
    refetchOnWindowFocus: true
  })
  const { data: sharePrices } = useAllVaultSharePrices(vaults)

  const tokenOptions = useMemo(() => {
    const options: (TokenWithAmount & Required<TokenWithPrice> & { value: number })[] = []

    if (!!tokens) {
      Object.values(tokens).forEach((token) => {
        const amount = tokenBalances?.[token.address]?.amount ?? 0n
        const price = tokenPrices?.[lower(token.address)] ?? 0
        const value = parseFloat(formatUnits(amount, token.decimals)) * price

        options.push({ ...token, amount, price, value })
      })
    }

    if (!!vault && !!vaultBalances) {
      Object.values(vaultBalances)
        .filter(
          (v) => v.chainId === chainId && !!v.amount && lower(v.address) !== lower(vault.address)
        )
        .forEach((share) => {
          const vaultId = getVaultId(share)
          const price = sharePrices?.[vaultId]?.price ?? 0
          const value = parseFloat(formatUnits(share.amount, share.decimals)) * price

          options.push({ ...share, amount: share.amount, price, value })
        })
    }

    return options.sort((a, b) => b.value - a.value)
  }, [tokens, tokenBalances, tokenPrices, vault, vaultBalances, sharePrices])

  return tokenOptions
}
