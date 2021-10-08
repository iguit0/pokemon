import React, { createContext } from 'react'
import { useLocalStorage } from '../hooks/Storage'

export const CoachContext = createContext({})

type Props = {
    children: React.ReactNode
}

export const CoachProvider = ({ children }: Props) => {
    const [name, setName] = useLocalStorage('coachName')
    const [pokemonType, setPokemonType] = useLocalStorage('pokemonType')

    return (
        <CoachContext.Provider value={{ name, setName, pokemonType, setPokemonType }}>{children}</CoachContext.Provider>
    )
}
