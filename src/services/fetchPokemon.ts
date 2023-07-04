import { Pokemon } from '../types/pokemon'
import api from './api'

export const fetchPokemon = async (pokemon: string) => {
  let pokeData: Pokemon | null = null
  let error

  try {
    const { data } = await api.get(`/pokemon/${pokemon}`)
    pokeData = data
  } catch (err) {
    error = err
  }

  return { pokeData, error }
}
