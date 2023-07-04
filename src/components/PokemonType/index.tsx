import { SyntheticEvent } from 'react'
import * as C from './styles'
import { pokemonTypes } from '../../types/pokemonTypes'

type PokemonTypeProps = {
  type: string
  tabIndex: boolean
  handleClick?: (e: SyntheticEvent) => void
}

export const PokemonType = (props: PokemonTypeProps) => {
  const [{ name, color }] = pokemonTypes.filter((item) => item.name === props.type)

  return name && color ? (
    <C.Type
      color={color}
      value={name}
      onClick={props.handleClick}
      tabIndex={props.tabIndex ? 0 : -1}
    >
      <img
        src={require(`../../assets/pokemonTypes/${name}.svg`)}
        width={16}
        height={16}
        alt={name}
      />
      {name}
    </C.Type>
  ) : (
    <C.ErrorMessage>Oops, the pokemon type was not found</C.ErrorMessage>
  )
}
