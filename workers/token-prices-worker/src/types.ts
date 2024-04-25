import { Address } from 'viem'
import { SUPPORTED_NETWORKS } from './constants'

export interface TokenPrices {
  [chainId: number]: ChainTokenPrices
}

export interface ChainTokenPrices {
  [address: Address]: { date: string; price: number }[]
}

export type SUPPORTED_NETWORK = (typeof SUPPORTED_NETWORKS)[number]

export interface CovalentPricingApiResponse {
  contract_address: Address
  quote_currency: string
  prices: { date: string; price: number | null }[]
}
