import React from 'react'
import { Button, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { CoachContext } from '../context/CoachProvider'
import { CoachProvider } from '../models/Context'

const POKEMON =
    'static/images/pokemon-logo.png 1x, static/images/pokemon-logo@2x.png 2x, static/images/pokemon-logo@3x.png 3x'

const FINDER = 'static/images/finder.png 1x, static/images/finder@2x.png 2x, static/images/finder@3x.png 3x'

const PIKACHU = 'static/images/pikachu.png 1x, static/images/pikachu@2x.png 2x, static/images/pikachu@3x.png 3x'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme: any) => ({
    pikachuContainer: {
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: '40%'
        },
        [theme.breakpoints.up('lg')]: {
            height: '100%'
        }
    },
    pikachu: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    [theme.breakpoints.up('sm')]: {
        pikachu: {
            right: theme.spacing(0)
        }
    }
}))

export const WelcomePage: React.FC = () => {
    const { name, pokemonType } = React.useContext(CoachContext) as CoachProvider
    const history = useHistory()
    const classes = useStyles()

    const redirectPage = () => {
        if (name === '' || pokemonType === '') {
            history.push('/create')
            return
        }
        history.push('/home')
    }

    return (
        <Grid container spacing={4} direction="column" justifyContent="flex-start" alignItems="center">
            <Grid item>
                <img srcSet={POKEMON} alt="Pokémon Logo" loading="lazy" />
            </Grid>
            <Grid item>
                <img srcSet={FINDER} alt="Finder Text" loading="lazy" />
            </Grid>
            <Grid
                item
                sx={{
                    mt: 15
                }}
            >
                <Button variant="contained" color="warning" disableElevation onClick={redirectPage} size="large">
                    Let's Go!
                </Button>
            </Grid>
            <Grid item>
                <img className={classes.pikachu} srcSet={PIKACHU} alt="Pikachu" loading="lazy" />
            </Grid>
        </Grid>
    )
}
