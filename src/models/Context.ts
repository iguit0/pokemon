export type CoachProvider = {
    name: string
    pokemonType: string
    setName: (name: string) => void
    setPokemonType: (type: string) => void
}
