export type PokemonTypes = {
    name: string
    thumbnailImage: string
}

export interface Pokemon {
    abilities: string[]
    detailPageURL: string
    weight: number
    height: number
    weakness: string[]
    number: string
    collectibles_slug: string
    featured: string
    slug: string
    name: string
    thumbnailAltText: string
    thumbnailImage: string
    id: number
    type: string[]
}
