import React from 'react'
import { render, screen } from '@testing-library/react'
import { PokemonModal } from '..'
import { Pokemon } from '../../../types/pokemon'

describe('PokemonModal', () => {
  const setModalMock = jest.fn()
  const pokemonDataMock: Pokemon = {
    id: 1,
    name: 'Pikachu',
    types: [{ type: { name: 'electric' } }],
    weight: 60,
    height: 4,
    stats: [
      { stat: { name: 'hp' }, base_stat: 55 },
      { stat: { name: 'attack' }, base_stat: 40 },
      { stat: { name: 'defense' }, base_stat: 35 },
      { stat: { name: 'special-attack' }, base_stat: 50 },
      { stat: { name: 'special-defense' }, base_stat: 50 },
      { stat: { name: 'speed' }, base_stat: 90 },
    ],
  }

  beforeEach(() => {
    render(<PokemonModal setModal={setModalMock} pokemonData={pokemonDataMock} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the Pokemon name', () => {
    const pokemonNameElement = screen.getByText('Pikachu')
    expect(pokemonNameElement).toBeInTheDocument()
  })

  it('renders the Pokemon types', () => {
    const electricTypeElement = screen.getByText('electric')
    expect(electricTypeElement).toBeInTheDocument()
  })

  it('renders the Pokemon weight', () => {
    const weightElement = screen.getByText('6 kg')
    expect(weightElement).toBeInTheDocument()
  })

  it('renders the Pokemon height', () => {
    const heightElement = screen.getByText('0.4 m')
    expect(heightElement).toBeInTheDocument()
  })

  it('renders the Pokemon stats', () => {
    const hpStatElement = screen.getByText('HP')
    const attackStatElement = screen.getByText('Attack')
    const defenseStatElement = screen.getByText('Defense')
    const specialAttackStatElement = screen.getByText('Sp. Atk')
    const specialDefenseStatElement = screen.getByText('Sp. Def')
    const speedStatElement = screen.getByText('Speed')

    expect(hpStatElement).toBeInTheDocument()
    expect(attackStatElement).toBeInTheDocument()
    expect(defenseStatElement).toBeInTheDocument()
    expect(specialAttackStatElement).toBeInTheDocument()
    expect(specialDefenseStatElement).toBeInTheDocument()
    expect(speedStatElement).toBeInTheDocument()
  })

  it('calls setModal with false when close button is clicked', () => {
    const closeButton = screen.getByTestId('close')
    closeButton.click()
    expect(setModalMock).toHaveBeenCalledWith(false)
  })
})
