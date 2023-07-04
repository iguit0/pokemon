import * as C from './styles'
import { PokemonCard } from '../PokemonCard'
import { Pokemon } from '../../types/pokemon'
import { Loading } from '../../helpers/Loading'
import { ErrorMessage } from '../../helpers/ErrorMessage'
import UsePagination from '../Pagination'

type PokedexProps = {
  setModal: (value: boolean) => void
  setPokemonData: (data: Pokemon) => void
  pokemonList: Pokemon[]
  setPokemonList: (data: Pokemon[]) => void
  pokemonAmount: number
  setPokemonAmount: (value: number) => void
  error: boolean
  loading: boolean
  setLoading: (value: boolean) => void
  page: number
  setPage: (value: number) => void
  showPagination: boolean
  setShowPagination: (value: boolean) => void
  searchBarRef: React.RefObject<HTMLDivElement>
}

export const Pokedex = (props: PokedexProps) => {
  if (props.error) return <ErrorMessage />
  else
    return (
      <C.Wrapper>
        <div className='main-container'>
          {props.loading ? (
            <Loading />
          ) : (
            <C.PokemonList>
              {props.pokemonList.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  setModal={props.setModal}
                  setPokemonData={props.setPokemonData}
                />
              ))}
            </C.PokemonList>
          )}
          {props.pokemonList.length > 1 && props.loading === false && (
            <UsePagination
              setPokemonList={props.setPokemonList}
              setLoading={props.setLoading}
              searchBarRef={props.searchBarRef}
              page={props.page}
              setPage={props.setPage}
            />
          )}
        </div>
      </C.Wrapper>
    )
}
