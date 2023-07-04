import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { PokemonCard } from '..'

describe('PokemonCard', () => {
  const pokemon = {
    id: 1,
    name: 'bulbasaur',
    types: [{ type: { name: 'grass' } }],
    weight: 69,
    height: 7,
    stats: [{ base_stat: 35, stat: { name: 'hp' } }],
  }

  test('renders the PokemonCard component', () => {
    const { getByText, getByAltText } = render(
      <PokemonCard pokemon={pokemon} setModal={jest.fn} setPokemonData={jest.fn} />,
    )

    const pokemonName = getByText('bulbasaur')
    const pokemonImg = getByAltText('bulbasaur')
    const moreDetailsButton = getByText('More Details')

    expect(pokemonName).toBeInTheDocument()
    expect(pokemonImg).toBeInTheDocument()
    expect(moreDetailsButton).toBeInTheDocument()
  })

  test('renders the PokemonCard component with id greater than 10', () => {
    const { getByText, getByAltText } = render(
      <PokemonCard pokemon={{ ...pokemon, id: 50 }} setModal={jest.fn} setPokemonData={jest.fn} />,
    )

    const pokemonName = getByText('bulbasaur')
    const pokemonImg = getByAltText('bulbasaur')
    const moreDetailsButton = getByText('More Details')

    expect(pokemonName).toBeInTheDocument()
    expect(pokemonImg).toBeInTheDocument()
    expect(moreDetailsButton).toBeInTheDocument()
  })

  test('renders the PokemonCard component with id greater than 99', () => {
    const { getByText, getByAltText } = render(
      <PokemonCard pokemon={{ ...pokemon, id: 300 }} setModal={jest.fn} setPokemonData={jest.fn} />,
    )

    const pokemonName = getByText('bulbasaur')
    const pokemonImg = getByAltText('bulbasaur')
    const moreDetailsButton = getByText('More Details')

    expect(pokemonName).toBeInTheDocument()
    expect(pokemonImg).toBeInTheDocument()
    expect(moreDetailsButton).toBeInTheDocument()
  })

  test('calls setModal and setPokemonData when More Details button is clicked', async () => {
    const setModal = jest.fn()
    const setPokemonData = jest.fn()

    const { findByTestId } = render(
      <PokemonCard pokemon={pokemon} setModal={setModal} setPokemonData={setPokemonData} />,
    )

    act(async () => {
      const moreDetailsButton = await findByTestId('more-details')
      fireEvent.click(moreDetailsButton)
      expect(setModal).toHaveBeenCalled()
      expect(setPokemonData).toHaveBeenCalledWith(pokemon)
    })
  })
})
