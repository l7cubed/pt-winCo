import { CreateWalletFn } from '@rainbow-me/rainbowkit/dist/wallets/Wallet'
import {
  argentWallet,
  braveWallet,
  coin98Wallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  tahoWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet
} from '@rainbow-me/rainbowkit/wallets'
import { NETWORK, NOUNS_TOKEN_ADDRESSES, USDC_TOKEN_ADDRESSES } from '@shared/utilities'
import defaultVaultList from '@vaultLists/default'
import { Address, parseUnits } from 'viem'
import {
  base,
  baseSepolia,
  mainnet,
} from 'viem/chains'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = {
  mainnets: [NETWORK.mainnet, NETWORK.base],
  testnets: [NETWORK.base_sepolia]
} as const

/**
 * Wagmi networks
 */
export const WAGMI_CHAINS = {
  [NETWORK.mainnet]: mainnet,
  [NETWORK.base]: base,
  [NETWORK.base_sepolia]: baseSepolia
} as const

/**
 * Wallets
 */
export const WALLETS: { [wallet: string]: CreateWalletFn } = {
  metamask: metaMaskWallet,
  walletconnect: walletConnectWallet,
  rainbow: rainbowWallet,
  injected: injectedWallet,
  argent: argentWallet,
  coinbase: coinbaseWallet,
  ledger: ledgerWallet,
  taho: tahoWallet,
  trust: trustWallet,
  zerion: zerionWallet,
  brave: braveWallet,
  safe: safeWallet,
  xdefi: xdefiWallet,
  uniswap: uniswapWallet,
  coin98: coin98Wallet,
  imtoken: imTokenWallet
}

/**
 * RPCs
 */
export const RPC_URLS = {
  [NETWORK.mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  [NETWORK.base]: process.env.NEXT_PUBLIC_BASE_RPC_URL,
  [NETWORK.base_sepolia]: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL
} as const

/**
 * Default vault lists
 */
export const DEFAULT_VAULT_LISTS = {
  default: defaultVaultList
} as const

/**
 * Event queries' start blocks
 */
export const QUERY_START_BLOCK = {
  [NETWORK.mainnet]: 1n,
  [NETWORK.base]: 14_506_800n,
  [NETWORK.base_sepolia]: 10_578_500n
} as const satisfies { [chainId: number]: bigint }

/**
 * TWAB rewards settings
 */
export const TWAB_REWARDS_SETTINGS: {
  [chainId: number]: { tokenAddresses: Address[]; fromBlock: bigint }
} = {
  [NETWORK.mainnet]: { tokenAddresses: [], fromBlock: QUERY_START_BLOCK[NETWORK.mainnet] },
  [NETWORK.base]: {
    tokenAddresses: [
      '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC
      '0x4200000000000000000000000000000000000006', // WETH
      '0x50c5725949a6f0c72e6c4a641f24049a917db0cb', // DAI
      '0x0a93a7BE7e7e426fC046e204C44d6b03A302b631', //NOUNS
      '0xA88594D404727625A9437C3f886C7643872296AE', // WELL
    ],
    fromBlock: QUERY_START_BLOCK[NETWORK.base]
  },
  [NETWORK.base_sepolia]: {
    tokenAddresses: [
      USDC_TOKEN_ADDRESSES[NETWORK.base_sepolia],
      NOUNS_TOKEN_ADDRESSES[NETWORK.base_sepolia]
    ],
    fromBlock: QUERY_START_BLOCK[NETWORK.base_sepolia]
  }
}

/**
 * Custom overwrite for wallet addresses
 */
export const WALLET_NAMES: { [address: Lowercase<Address>]: { name: string; chainId?: number } } = {
  '0x327b2ea9668a552fe5dec8e3c6e47e540a0a58c6': { name: 'GP Booster', chainId: NETWORK.base },
  '0x1dcfb8b47c2f05ce86c21580c167485de1202e12': { name: 'GP Booster', chainId: NETWORK.arbitrum }
}

/**
 * Zap settings
 */
export const ZAP_SETTINGS: {
  [chainId: number]: { zapRouter: Address; zapTokenManager: Address }
} = {
  [NETWORK.base]: {
    zapRouter: '0x6F19Da51d488926C007B9eBaa5968291a2eC6a63',
    zapTokenManager: '0x3fBD1da78369864c67d62c242d30983d6900c0f0'
  }
}

/**
 * Amount of native assets to suggest not spending (for gas purposes)
 */
export const NATIVE_ASSET_IGNORE_AMOUNT: { [chainId: number]: bigint } = {
  [NETWORK.base]: parseUnits('0.002', 18),
}

/**
 * Velodrome addresses
 */
export const VELODROME_ADDRESSES: {
  [chainId: number]: { router: Address; lpFactories: Lowercase<Address>[] }
} = {
  [NETWORK.base]: {
    router: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    lpFactories: [
      '0x420dd381b31aef6683db6b902084cb0ffece40da',
      '0x5e7bb104d84c7cb9b682aac2f3d509f5f406809a'
    ]
  }
}

/**
 * Fathom events
 */
export const FATHOM_EVENTS = {
  approvedExact: 'ApprovedExact',
  changedCurrency: 'ChangedCurrency',
  changedLanguage: 'ChangedLanguage',
  changedRPC: 'ChangedRPC',
  checkedPrizes: 'CheckedPrizes',
  delegated: 'Delegated',
  deposited: 'Deposited',
  depositedWithPermit: 'DepositedWithPermit',
  depositedWithZap: 'DepositedWithZap',
  importedVaultList: 'ImportedVaultList',
  openedDelegateModal: 'OpenedDelegateModal',
  openedDepositModal: 'OpenedDepositModal',
  openedDrawModal: 'OpenedDrawModal',
  openedWithdrawModal: 'OpenedWithdrawModal',
  redeemed: 'Redeemed'
} as const

/**
 * Wallet stats API
 */
export const WALLET_STATS_API_URL = 'https://wallet-stats.api.cabana.fi'
