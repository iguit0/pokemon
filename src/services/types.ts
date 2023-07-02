import { Pokemon } from '../types/pokemon'

export interface Pagination {
  offset?: number
  limit?: number
}

export type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}
