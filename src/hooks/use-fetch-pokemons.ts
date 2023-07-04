import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import api from '../services/api'
import { PokemonResponse } from '../services/types'
import { Pokemon } from '../types/pokemon'

function useFetchPokemons() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  })

  const getPokemonByName = useCallback(async (name: string) => {
    setLoading(true)
    try {
      const { data } = await api.get(`/pokemon/${name}`)
      return data
    } catch (error) {
      setError({ error: true, message: (error as AxiosError).message })
    } finally {
      setLoading(false)
    }
  }, [])

  const getAllPokemons = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const { data } = await api.get<PokemonResponse>(`/pokemon?limit=${page}`)
      setPokemons(data.results)
    } catch (error) {
      setError({ error: true, message: (error as AxiosError).message })
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, pokemons, setLoading, error, getAllPokemons, getPokemonByName }
}

export default useFetchPokemons
