import api from './api'
import { fetchPokemon } from './fetchPokemon'

export const fetchPokemonList = async (page: number, limit = '6') => {
  const parsedLimit = parseInt(limit)

  const offset = parsedLimit * (page - 1)

  const { data } = await api.get(`/pokemon?offset=${offset}&limit=${parsedLimit}`)

  const promises = data.results.map(
    async (pokemon: { name: string }) => (await fetchPokemon(pokemon.name)).pokeData,
  )

  return Promise.all(promises)
}
