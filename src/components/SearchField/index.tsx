import * as C from './styles'
import { useCallback, useEffect, useState } from 'react'
import { Pokemon } from '../../types/pokemon'

import { MdClear } from 'react-icons/md'
import { fetchPokemon } from '../../services/fetchPokemon'
import { useDebounce } from '../../hooks'
import { fetchPokemonList } from '../../services/fetchPokemonList'

type SearchFieldProps = {
  error: boolean
  setPokemonList: (data: Pokemon[]) => void
  setError: (value: boolean) => void
  setLoading: (value: boolean) => void
}

export const SearchField = (props: SearchFieldProps) => {
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce<string>(inputValue, 1000)

  const searchByName = useCallback(async (value: string) => {
    props.setLoading(true)

    if (value.toLowerCase()) {
      const requestPokemon = await fetchPokemon(value.toLowerCase())

      requestPokemon.data
        ? props.setPokemonList([requestPokemon.data])
        : props.setError(requestPokemon.error)
    }

    if (!value) {
      props.setPokemonList(await fetchPokemonList(1))
    }
    props.setLoading(false)
  }, [])

  useEffect(() => {
    searchByName(debouncedValue)
  }, [debouncedValue])

  return (
    <C.Container>
      <C.InputText
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Search by name or ID'
      />
      {props.error && <C.SearchButton>{<MdClear color='#fff' />}</C.SearchButton>}
    </C.Container>
  )
}
