import { PokemonType } from '../PokemonType'
import * as C from './styles'

import { Pokemon } from '../../types/pokemon'
import { SkeletonLoading } from '../../helpers/SkeletonLoading'
import { IoScaleOutline } from 'react-icons/io5'
import { RxRulerSquare } from 'react-icons/rx'
import { FaBolt } from 'react-icons/fa'
import { fetchPokemon } from '../../services/fetchPokemon'
import { pokemonTypes } from '../../types/pokemonTypes'

type PokemonCardProps = {
  pokemon: Pokemon
  setModal: (value: boolean) => void
  setPokemonData: (data: Pokemon) => void
}

export const PokemonCard = (props: PokemonCardProps) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.pokemon.id}.png`

  const [{ color }] = pokemonTypes.filter(
    (type) => props.pokemon.types[0].type.name.indexOf(type.name) !== -1,
  )

  const formatPokemonId = (id: number) => {
    if (id < 10) return `#00${id}`
    else if (id >= 10 && id < 99) return `#0${id}`
    else return `#${id}`
  }

  const handleClick = async () => {
    const { pokeData } = await fetchPokemon(props.pokemon.name)

    if (!pokeData) {
      return
    }
    props.setPokemonData(pokeData)
    props.setModal(true)
  }

  return (
    <C.Container>
      <C.CardOverlay color={color} />
      <C.PokemonImg>
        <SkeletonLoading src={imgUrl} alt={props.pokemon.name} />
      </C.PokemonImg>
      <C.PokemonNumber>{formatPokemonId(props.pokemon.id)}</C.PokemonNumber>
      <C.PokemonName>{props.pokemon.name}</C.PokemonName>
      <C.PokemonType>
        {props.pokemon.types.map(({ type }) => (
          <PokemonType key={type.name} type={type.name} tabIndex={false} />
        ))}
      </C.PokemonType>
      <C.PokemonFeatures>
        <C.PokemonWeight>
          <div>
            <IoScaleOutline />
            <span>{props.pokemon.weight / 10} kg</span>
          </div>
          <span>Weight</span>
        </C.PokemonWeight>
        <C.PokemonHeight>
          <div>
            <RxRulerSquare />
            <span>{props.pokemon.height / 10} m</span>
          </div>
          <span>Height</span>
        </C.PokemonHeight>
      </C.PokemonFeatures>
      <C.MoreDetailsButton data-testid='more-details' color={color} onClick={handleClick}>
        <FaBolt />
        More Details
      </C.MoreDetailsButton>
    </C.Container>
  )
}
