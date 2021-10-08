import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouter } from './router'
import pokemonTheme from './theme'
import { CoachProvider } from './context/CoachProvider'

export const App = () => (
    <ThemeProvider theme={pokemonTheme}>
        <CoachProvider>
            <AppRouter />
        </CoachProvider>
    </ThemeProvider>
)
