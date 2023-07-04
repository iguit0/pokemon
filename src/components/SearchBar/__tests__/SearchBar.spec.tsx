import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { SearchBar } from '..'

describe('SearchBar component', () => {
  const mockSetPokemonList = jest.fn()
  const mockSetPokemonAmount = jest.fn()
  const mockSetError = jest.fn()
  const mockSetLoading = jest.fn()
  const mockSetPage = jest.fn()
  const mockSetShowPagination = jest.fn()
  const mockSearchBarRef = React.createRef<HTMLDivElement>()
  const mockPokemonList = []
  const mockLoading = false
  const mockPage = 1
  const mockError = false

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without errors', () => {
    render(
      <SearchBar
        setPokemonList={mockSetPokemonList}
        pokemonAmount={mockPokemonList.length}
        setPokemonAmount={mockSetPokemonAmount}
        setError={mockSetError}
        setLoading={mockSetLoading}
        setPage={mockSetPage}
        setShowPagination={mockSetShowPagination}
        searchBarRef={mockSearchBarRef}
        pokemonList={mockPokemonList}
        loading={mockLoading}
        page={mockPage}
        error={mockError}
      />,
    )
  })

  it('should handle change in page size', async () => {
    const { getByTestId } = render(
      <SearchBar
        setPokemonList={mockSetPokemonList}
        pokemonAmount={mockPokemonList.length}
        setPokemonAmount={mockSetPokemonAmount}
        setError={mockSetError}
        setLoading={mockSetLoading}
        setPage={mockSetPage}
        setShowPagination={mockSetShowPagination}
        searchBarRef={mockSearchBarRef}
        pokemonList={mockPokemonList}
        loading={mockLoading}
        page={mockPage}
        error={mockError}
      />,
    )
    const selectElement = getByTestId('page-size-select') as HTMLSelectElement
    selectElement.value = '12'
    fireEvent.change(selectElement)

    await waitFor(() => {
      expect(selectElement.value).toBe('12')
      expect(mockSetLoading).toHaveBeenCalledTimes(1)
      expect(mockSetLoading).toHaveBeenCalledWith(true)
    })
  })
})
