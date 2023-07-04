type PokemonType = {
  type: {
    name: string
  }
}

type Stat = {
  base_stat: number
  stat: { name: string }
}

export type Pokemon = {
  id: number
  name: string
  types: PokemonType[]
  weight: number
  height: number
  stats: Stat[]
}
