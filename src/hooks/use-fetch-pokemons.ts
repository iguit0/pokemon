import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import api from '../services/api'
import { Pagination, PokemonResponse } from '../services/types'
import { Pokemon } from '../types/pokemon'

function useFetchPokemons() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  })

  const fetchPokemons = useCallback(async (pagination: Pagination) => {
    setLoading(true)
    try {
      const { data } = await api.get<PokemonResponse>(`/pokemon?limit=${pagination.limit}`)
      setPokemons(data.results)
    } catch (error) {
      setError({ error: true, message: (error as AxiosError).message })
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, pokemons, error, fetchPokemons }
}

export default useFetchPokemons
