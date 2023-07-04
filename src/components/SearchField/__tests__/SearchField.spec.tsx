import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { SearchField } from '..'

describe('SearchField component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render SearchButton when error prop is true', () => {
    const mockError = true
    const mockSetPokemonList = jest.fn()
    const mockSetError = jest.fn()
    const mockSetLoading = jest.fn()

    const { getByTestId } = render(
      <SearchField
        error={mockError}
        setPokemonList={mockSetPokemonList}
        setError={mockSetError}
        setLoading={mockSetLoading}
      />,
    )

    const searchButtonElement = getByTestId('search-button')

    expect(searchButtonElement).toBeInTheDocument()
  })

  it('should not render SearchButton when error prop is false', () => {
    const mockError = false
    const mockSetPokemonList = jest.fn()
    const mockSetError = jest.fn()
    const mockSetLoading = jest.fn()

    const { queryByTestId } = render(
      <SearchField
        error={mockError}
        setPokemonList={mockSetPokemonList}
        setError={mockSetError}
        setLoading={mockSetLoading}
      />,
    )

    const searchButtonElement = queryByTestId('search-button')

    expect(searchButtonElement).toBeNull()
  })

  it('should call onChange handler when input value changes', () => {
    const mockError = false
    const mockSetPokemonList = jest.fn()
    const mockSetError = jest.fn()
    const mockSetLoading = jest.fn()

    const { getByPlaceholderText } = render(
      <SearchField
        error={mockError}
        setPokemonList={mockSetPokemonList}
        setError={mockSetError}
        setLoading={mockSetLoading}
      />,
    )

    const inputElement = getByPlaceholderText('Search by name or ID') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } })

    expect(inputElement.value).toBe('Pikachu')
    expect(mockSetLoading).toHaveBeenCalledTimes(1)
    expect(mockSetLoading).toHaveBeenCalledWith(true)
  })
})
