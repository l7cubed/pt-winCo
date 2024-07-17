import { Accordion } from '@shared/ui'
import { LINKS } from '@shared/utilities'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface FaqSectionProps {
  className?: string
}

export const FaqSection = (props: FaqSectionProps) => {
  const { className } = props

  const faqs: { question: string; answer: ReactNode }[] = [
    {
      question: 'What is PoolTogether?',
      answer: (
        <span>
          PoolTogether is an open-source protocol designed to enhance financial security by making
          saving enjoyable. When users deposit into the system, the interest accumulates across all
          deposits and is then randomly distributed as prizes. The protocol turns your interest into
          fun rewards! You never lose your principal, and have a chance to win big. Learn more at{' '}
          <FaqLink href={LINKS.protocolLandingPage}>pooltogether.com</FaqLink>
        </span>
      )
    },
    {
      question: 'What is POP?',
      answer: (
        <span>
          Nouns.win offers no loss savings strategies allowing users to win NOUNS token by using PoolTogether V5's audited contracts.{' '}
          <FaqLink href={LINKS.app}>app.nouns.win</FaqLink> allows anyone to deposit and withdraw
          from the protocol. <FaqLink href={LINKS.vaultFactory}>factory.nouns.win</FaqLink> allows
          anyone to deploy their own prize vaults using ERC-4626 compatible yield sources.{' '}
        </span>
      )
    }
  ]

  return (
    <section className={classNames('w-full flex flex-col gap-1 items-center', className)}>
      <span className='text-xl font-bold md:text-3xl'>Frequently Asked Questions</span>
      <Accordion
        items={faqs.map((faq, i) => ({
          id: `faq-${i}`,
          title: <span className='text-pt-purple-50'>{faq.question}</span>,
          content: faq.answer
        }))}
        className='w-full'
        titleClassName='w-full !justify-center mt-11 text-xl !font-bold text-pt-purple-300 bg-transparent'
        contentClassName='text-center text-xl text-pt-purple-100 bg-transparent'
      />
    </section>
  )
}

interface FaqLinkProps {
  href: string
  children: string
}

const FaqLink = (props: FaqLinkProps) => {
  const { href, children } = props

  return (
    <a href={href} target='_blank' className='text-pt-purple-50'>
      {children}
    </a>
  )
}
