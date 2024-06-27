import { VaultList } from '@shared/types'
import { NETWORK } from '@shared/utilities'

export const baseVaults: VaultList['tokens'] = [
  {
    chainId: NETWORK.base,
    address: '0x82536B14f6D89E8409B292df5e93C14056aeEdEE',
    name: 'WinNOUNS-Staking',
    decimals: 18,
    symbol: 'winNOUNS',
    logoURI: `https://i.imgur.com/InzJwXV.png`,
    extensions: {
      underlyingAsset: {
        address: '0x0a93a7BE7e7e426fC046e204C44d6b03A302b631',
        symbol: 'NOUNS',
        name: 'NounsToken'
      }
    }
  },
  {
    chainId: NETWORK.base,
    address: '0x0B0b13Aa1d92Cc8A944F4Ed03aE6c7F8A4b3bd12',
    name: 'WinWETH-Aloe',
    decimals: 18,
    symbol: 'winWETH',
    logoURI: `https://i.imgur.com/mz8MIwm.png`,
    extensions: {
      underlyingAsset: {
        address: '0x4200000000000000000000000000000000000006',
        symbol: 'WETH',
        name: 'NounsToken'
      }
    }
  },
  {
    chainId: NETWORK.base,
    address: '0x88C57d18074b7460122f4Da27BBe3948b71b0B72',
    name: 'WinNOUNS-Aloe',
    decimals: 18,
    symbol: 'winNOUNS',
    logoURI: `https://i.imgur.com/InzJwXV.png`,
    extensions: {
      underlyingAsset: {
        address: '0x0a93a7BE7e7e426fC046e204C44d6b03A302b631',
        symbol: 'NOUNS',
        name: 'NounsToken'
      }
    }
  },
]
