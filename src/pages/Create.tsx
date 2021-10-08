import React, { useState, useContext } from 'react'
import { Grid, Typography, Fab } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'
import CreateForm from '../components/CreateForm'
import { CoachProvider } from '../models/Context'
import { CoachContext } from '../context/CoachProvider'

import pokemonsTypesList from '../data/pokemonsTypesList.json'
import { BackButton } from '../components/BackButton'
import Toast from '../components/Toast'
import { ToastType } from '../models/Components'
import { TOAST_DURATION } from '../utils/helper'

const NEXT = 'static/images/next.png 1x, static/images/next@2x.png 2x, static/images/next@3x.png 3x'

export const CreatePage: React.FC = () => {
    const [toastMessage, setToastMessage] = useState<string>('')
    const [toastType, setToastType] = useState<ToastType>('error')
    const [toastOpen, setToastOpen] = useState<boolean>(false)
    const [hasName, setHasName] = useState<boolean>(false)

    const { name, pokemonType } = useContext(CoachContext) as CoachProvider
    const history = useHistory()

    const renderTitle = () => {
        return hasName ? `Hello, trainer ${name}` : `Let's meet each other first?`
    }

    const renderSubtitle = () => {
        return hasName ? '...now tell us which is your favorite Pokémon type' : 'First we need to know your name...'
    }

    const moveForward = () => {
        if (name === '') {
            setToastOpen(true)
            setToastType('error')
            setToastMessage('Name is required')
            return
        }
        if (hasName && pokemonType === '') {
            setToastOpen(true)
            setToastType('error')
            setToastMessage('Select pokemon type')
            return
        }
        if (!hasName) {
            setHasName(true)
            return
        }
        history.push('/home')
    }

    const onClickHeader = () => {
        history.push('/')
    }

    const closeToast = () => {
        setToastOpen(false)
    }

    return (
        <>
            <Grid container spacing={4} direction="column">
                <BackButton {...{ onClickHeader }} />
                <Grid item marginBottom={10}>
                    <Typography textAlign="center" variant="h3" color={grey.A100}>
                        {renderTitle()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography textAlign="center" variant="h5" color={grey.A100}>
                        {renderSubtitle()}
                    </Typography>
                </Grid>
                <Grid item>
                    <CreateForm hasName={hasName} pokemonsTypesOptions={pokemonsTypesList.results} />
                </Grid>
                <Grid
                    item
                    alignSelf="center"
                    sx={{
                        position: 'absolute',
                        bottom: '2rem',
                        '.Mui-disabled': {
                            backgroundColor: 'transparent',
                            opacity: 0.5
                        }
                    }}
                >
                    <Fab
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                        onClick={moveForward}
                        sx={{
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            '&:hover': {
                                background: 'none'
                            }
                        }}
                    >
                        <img srcSet={NEXT} alt="next" loading="lazy" />
                    </Fab>
                </Grid>
            </Grid>
            <Toast
                duration={TOAST_DURATION()}
                isOpen={toastOpen}
                onClose={closeToast}
                message={toastMessage}
                type={toastType}
            />
        </>
    )
}
