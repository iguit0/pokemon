import { render, screen } from '@testing-library/react'
import { Footer } from '..'

describe('Footer', () => {
  test('renders footer text correctly', () => {
    render(<Footer />)

    const footerText = screen.getByText(/All rights reserved to Nintendo & The Pokemon Company/i)
    expect(footerText).toBeInTheDocument()

    const poweredByText = screen.getByText(/Powered by/i)
    expect(poweredByText).toBeInTheDocument()

    const linkElement = screen.getByText(/pokeapi.co/i)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', 'https://pokeapi.co/')
    expect(linkElement).toHaveAttribute('target', '_blank')
    expect(linkElement).toHaveAttribute('rel', 'noreferrer')
  })

  test('renders Footer', () => {
    render(<Footer />)

    const text = screen.getByText(/All rights reserved to Nintendo & The Pokemon Company/i)
    expect(text).toBeInTheDocument()
  })
})
