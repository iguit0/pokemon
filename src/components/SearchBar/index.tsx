import { Pokemon } from '../../types/pokemon'
import { SearchField } from '../SearchField'
import * as C from './styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { fetchPokemonList } from '../../services/fetchPokemonList'

type SearchBarProps = {
  setPokemonList: (data: Pokemon[]) => void
  pokemonAmount: number
  setPokemonAmount: (value: number) => void
  setError: (value: boolean) => void
  setLoading: (value: boolean) => void
  setPage: (value: number) => void
  setShowPagination: (value: boolean) => void
  searchBarRef: React.RefObject<HTMLDivElement>
  pokemonList: Pokemon[]
  loading: boolean
  page: number
  error: boolean
}

export const SearchBar = (props: SearchBarProps) => {
  const [limit, setLimit] = useState('6')

  const handleChangePageSize = async (event: SelectChangeEvent) => {
    const pageSize = event.target.value
    setLimit(pageSize)

    props.setLoading(true)

    const pokemons = await fetchPokemonList(props.page, pageSize)

    props.setPokemonAmount(pokemons.length)
    props.setPokemonList(pokemons)
    props.setLoading(false)
  }

  return (
    <div className='main-container'>
      <C.Container>
        <Select
          sx={{
            width: 100,
            height: 40,
            marginRight: 15,
            border: '1px solid #2f5aff',
            color: '#fff',
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          value={limit}
          onChange={handleChangePageSize}
          data-testid='page-size-select'
        >
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'12'}>12</MenuItem>
          <MenuItem value={'21'}>21</MenuItem>
          <MenuItem value={'30'}>30</MenuItem>
          <MenuItem value={'45'}>45</MenuItem>
          <MenuItem value={'60'}>60</MenuItem>
        </Select>
        <SearchField
          error={props.error}
          setPokemonList={props.setPokemonList}
          setError={props.setError}
          setLoading={props.setLoading}
        />
      </C.Container>
    </div>
  )
}
