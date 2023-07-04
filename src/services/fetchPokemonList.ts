import { fetchPokemon } from './fetchPokemon'

export const fetchPokemonList = async (page: number, limit = '6') => {
  const parsedLimit = parseInt(limit)

  const offset = parsedLimit * (page - 1)
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${parsedLimit}`

  const response = await fetch(URL)
  const data = await response.json()

  const promises = data.results.map(
    async (pokemon: { name: string }) => (await fetchPokemon(pokemon.name)).data,
  )

  const pokemonList = Promise.all(promises)

  return pokemonList
}
