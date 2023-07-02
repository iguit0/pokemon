import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import api from '../services/api'
import { Pagination, PokemonResponse } from '../services/types'
import { Pokemon } from '../types/pokemon'

function useFetchPokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPokemons = useCallback(async (pagination: Pagination) => {
    setLoading(true)
    try {
      const { data } = await api.get<PokemonResponse>(`/pokemon?limit=${pagination.limit}`)
      setPokemons(data.results)
      return data
    } catch (err) {
      setError(err as AxiosError)
    } finally {
      setLoading(false)
    }
  }, [])

  return { pokemons, error, loading, fetchPokemons }
}

export default useFetchPokemons
