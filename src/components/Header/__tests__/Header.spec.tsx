import { render, screen } from '@testing-library/react'
import { Header } from '..'

describe('Header', () => {
  test('renders the header component', () => {
    render(<Header />)

    const headerElement = screen.getByTestId('header-component')
    expect(headerElement).toBeInTheDocument()
  })

  test('renders the Pokemon logo', () => {
    render(<Header />)

    const pokemonLogoElement = screen.getByTestId('pokemon-logo')
    expect(pokemonLogoElement).toBeInTheDocument()
  })
})
