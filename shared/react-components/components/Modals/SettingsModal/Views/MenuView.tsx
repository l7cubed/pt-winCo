import { CubeTransparentIcon, SparklesIcon } from '@heroicons/react/24/outline'
import {
  SUPPORTED_CURRENCIES,
  useSelectedCurrency,
  useSelectedLanguage
} from '@shared/generic-react-hooks'
import { Intl } from '@shared/types'
import { BasicIcon } from '@shared/ui'
import { LINKS } from '@shared/utilities'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { SettingsModalOption, SettingsModalView } from '..'
import { ClipboardListIcon } from '../../../Icons/ClipboardListIcon'

interface MenuViewProps {
  setView: (view: SettingsModalView) => void
  disable?: SettingsModalOption[]
  hide?: SettingsModalOption[]
  intl?: Intl<
    | 'customizeExperience'
    | 'changeCurrency'
    | 'changeLanguage'
    | 'viewEcosystem'
    | 'manageVaultLists'
    | 'setCustomRPCs'
    | 'getHelp'
    | 'getHelpWithCabana'
  >
}

export const MenuView = (props: MenuViewProps) => {
  const { setView, disable, hide, intl } = props

  const { selectedCurrency } = useSelectedCurrency()
  const { selectedLanguage } = useSelectedLanguage()

  return (
    <div className='flex flex-col gap-4'>
      <SettingsMenuSection
        title={intl?.('customizeExperience') ?? 'Customize Your Experience'}
        items={[
          {
            iconContent: SUPPORTED_CURRENCIES[selectedCurrency].symbol,
            title: intl?.('changeCurrency') ?? 'Vault Factory',
            onClick: () => setView('currency'),
            disabled: disable?.includes('currency'),
            hidden: hide?.includes('currency')
          },
          {
            iconContent: selectedLanguage.toUpperCase(),
            iconClassName: '!text-base font-semibold',
            title: intl?.('changeLanguage') ?? 'Rewards Builder',
            onClick: () => setView('language'),
            disabled: disable?.includes('language'),
            hidden: hide?.includes('language')
          },
          {
            iconContent: <ClipboardListIcon className='h-6 w-6 text-pt-purple-100' />,
            title: intl?.('manageVaultLists') ?? 'Manage Vault Lists',
            onClick: () => setView('vaultLists'),
            disabled: disable?.includes('vaultLists'),
            hidden: hide?.includes('vaultLists')
          },
          {
            iconContent: <CubeTransparentIcon className='h-6 w-6 text-pt-purple-100' />,
            title: intl?.('setCustomRPCs') ?? 'Set Custom RPCs',
            onClick: () => setView('customRPCs'),
            disabled: disable?.includes('customRPCs'),
            hidden: hide?.includes('customRPCs')
          }
        ]}
      />
      <SettingsMenuSection
        title={intl?.('viewEcosystem') ?? 'View Ecosystem'}
        items={[
          {
            iconContent: <SparklesIcon className='h-6 w-6 text-pt-purple-100' />,
            title: intl?.('viewEcosystem') ?? 'View Ecosystem',
            onClick: () => window.open(LINKS.ecosystem)
          }
        ]}
      />
    </div>
  )
}

interface SettingsMenuSectionProps {
  title: string
  items: SettingsMenuItemProps[]
}

const SettingsMenuSection = (props: SettingsMenuSectionProps) => {
  const { title, items } = props

  return (
    <div className='flex flex-col gap-4'>
      <span className='text-xl font-semibold text-pt-purple-50 md:text-2xl'>{title}</span>
      {items.map((item) => {
        return (
          <SettingsMenuItem
            key={`st-item-${item.title.toLowerCase().replaceAll(' ', '-')}`}
            {...item}
          />
        )
      })}
    </div>
  )
}

interface SettingsMenuItemProps {
  iconContent: ReactNode
  title: string
  onClick: () => void
  iconClassName?: string
  disabled?: boolean
  hidden?: boolean
}

const SettingsMenuItem = (props: SettingsMenuItemProps) => {
  const { iconContent, title, onClick, iconClassName, disabled, hidden } = props

  return (
    <div
      className={classNames(
        'flex gap-3 w-full items-center rounded-lg px-8 py-4 select-none relative bg-pt-transparent hover:bg-pt-transparent/5',
        { 'cursor-pointer': !disabled, 'brightness-50': disabled },
        { hidden: hidden }
      )}
      onClick={() => {
        if (!disabled) {
          onClick()
        }
      }}
    >
      <BasicIcon content={iconContent} size='lg' theme='dark' className={iconClassName} />
      <span className='flex items-center text-pt-purple-50'>{title}</span>
    </div>
  )
}
