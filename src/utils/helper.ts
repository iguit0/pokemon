import { Pokemon } from '../models/Pokemon'

const POKEMON_OFFICIAL_URL: Readonly<string> = 'https://www.pokemon.com'

export const capitalizeString = (stringToConvert: string) => {
    const firstCharacter = stringToConvert.substring(0, 1)
    const restString = stringToConvert.substring(1)

    return firstCharacter.toUpperCase() + restString
}

export const pokemonKey = (pokemon: Pick<Pokemon, 'name' | 'id' | 'weight'>) => {
    return `${pokemon.name}-${pokemon.id}-${pokemon.weight}`
}

export const removeDuplicated = (pokemons: Pokemon[]) => {
    return pokemons.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
}

export const TOAST_DURATION = (seconds = 6) => {
    return seconds * 1000
}

export const redirectToPokedex = (detailPageURL: string) => {
    const url = `${POKEMON_OFFICIAL_URL}${detailPageURL}`
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    // for securiy reasons (:
    // more details https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever
    if (newWindow) {
        newWindow.opener = null
    }
}

export function sortPokemons(pA: Pokemon, pB: Pokemon): number {
    if (pA.name.toLowerCase() < pB.name.toLowerCase()) {
        return -1
    }
    if (pA.name.toLowerCase() > pB.name.toLowerCase()) {
        return 1
    }
    return 0
}
