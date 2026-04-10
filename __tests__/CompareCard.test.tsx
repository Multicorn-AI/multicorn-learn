import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { CompareCard } from '@/components/CompareCard'

afterEach(() => {
  cleanup()
})

describe('CompareCard', () => {
  it('renders use case heading, name, summary, strengths list, and gaps list', () => {
    render(
      <CompareCard
        useCase="I want an example use case."
        name="Example Tool"
        summary="One-line summary for the tool."
        strengths={['Strength A', 'Strength B']}
        gaps={['Gap A']}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'I want an example use case.' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Example Tool')).toBeInTheDocument()
    expect(screen.getByText('One-line summary for the tool.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'What it does well' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'What it does not cover' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Strength A')).toBeInTheDocument()
    expect(screen.getByText('Strength B')).toBeInTheDocument()
    expect(screen.getByText('Gap A')).toBeInTheDocument()
  })

  it('renders Learn more link with href, target, rel, and aria-label when url is provided', () => {
    render(
      <CompareCard
        useCase="Use case"
        name="Agent Safehouse"
        summary="Summary"
        strengths={[]}
        gaps={[]}
        url="https://agent-safehouse.dev"
      />,
    )

    const link = screen.getByRole('link', { name: 'Learn more about Agent Safehouse' })
    expect(link).toHaveAttribute('href', 'https://agent-safehouse.dev')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not render Learn more when url is omitted', () => {
    render(
      <CompareCard useCase="Use case" name="Tool" summary="Summary" strengths={[]} gaps={[]} />,
    )

    expect(screen.queryByRole('link', { name: /Learn more about/ })).not.toBeInTheDocument()
  })

  it('renders tracked CTA when highlight and trackedCta are provided', () => {
    render(
      <CompareCard
        useCase="Use case"
        name="Shield"
        summary="Summary"
        strengths={[]}
        gaps={[]}
        highlight
        trackedCta={{
          href: 'https://app.multicorn.ai/signup',
          eventName: 'test_click',
          label: 'Sign up for Shield',
        }}
      />,
    )

    expect(screen.getByRole('link', { name: 'Sign up for Shield' })).toHaveAttribute(
      'href',
      'https://app.multicorn.ai/signup',
    )
  })

  it('does not render CTA when highlight is false and trackedCta is omitted', () => {
    render(
      <CompareCard
        useCase="Use case"
        name="Tool"
        summary="Summary"
        strengths={[]}
        gaps={[]}
        highlight={false}
      />,
    )

    expect(screen.queryByRole('link', { name: /Sign up/ })).not.toBeInTheDocument()
  })

  it('renders strength and gap items in order', () => {
    const { container } = render(
      <CompareCard
        useCase="Use case"
        name="Tool"
        summary="Summary"
        strengths={['first strength', 'second strength', 'third strength']}
        gaps={['first gap', 'second gap']}
      />,
    )

    const article = container.querySelector('article')
    expect(article).not.toBeNull()
    if (article === null) {
      return
    }
    const lists = article.querySelectorAll('ul')
    expect(lists).toHaveLength(2)

    const strengthItems = within(lists[0] as HTMLElement).getAllByRole('listitem')
    expect(strengthItems.map((li) => li.textContent)).toEqual([
      'first strength',
      'second strength',
      'third strength',
    ])

    const gapItems = within(lists[1] as HTMLElement).getAllByRole('listitem')
    expect(gapItems.map((li) => li.textContent)).toEqual(['first gap', 'second gap'])
  })
})
