import { VaultList } from '@shared/types'
import { NETWORK } from '@shared/utilities'

export const baseVaults: VaultList['tokens'] = [
  {
    chainId: NETWORK.base,
    address: '0x82536B14f6D89E8409B292df5e93C14056aeEdEE',
    name: 'Win NOUNS',
    decimals: 18,
    symbol: 'winNOUNS',
    logoURI: `https://i.imgur.com/InzJwXV.png`,
    extensions: {
      underlyingAsset: {
        address: '0x0a93a7BE7e7e426fC046e204C44d6b03A302b631',
        symbol: 'NOUNS',
        name: 'Nouns Token'
      }
    }
  }
]
