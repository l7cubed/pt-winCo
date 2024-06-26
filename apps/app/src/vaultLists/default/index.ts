import { VaultList } from '@shared/types'
import { baseVaults } from './base'
import { baseSepoliaVaults } from './baseSepolia'


const defaultVaultList: VaultList = {
  name: 'Nouns Vault List',
  keywords: ['pooltogether', 'win', 'myevm', 'nouns'],
  version: { major: 2, minor: 8, patch: 2 },
  timestamp: '2024-06-04T19:40:08Z',
  logoURI: 'https://i.imgur.com/InzJwXV.png', // Updated logo URI
  tokens: [
    ...baseVaults,
    ...baseSepoliaVaults
  ]
}


export default defaultVaultList


