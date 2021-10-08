import React, { useContext } from 'react'
import {
    Box,
    ListItem,
    Avatar,
    Grid,
    MenuItem,
    FormControl,
    Select,
    TextField,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { makeStyles } from '@mui/styles'

import { CoachContext } from '../context/CoachProvider'
import { CoachProvider } from '../models/Context'
import { PokemonTypes } from '../models/Pokemon'
import { capitalizeString } from '../utils/helper'

const useStyles = makeStyles({
    selected: {
        backgroundColor: 'transparent'
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    selectRoot: {
        height: '3.5rem',
        '&:before, &:hover:not(.Mui-disabled):before, &:after': {
            borderBottomWidth: '.3rem',
            borderBottomColor: 'white'
        }
    },
    select: {
        '&:focus': {
            backgroundColor: 'transparent'
        }
    },
    selectIcon: {
        color: 'white',
        fontSize: '3rem'
    }
})

export default function CreateForm(props: { hasName: boolean; pokemonsTypesOptions: PokemonTypes[] }) {
    const { setName, pokemonType, setPokemonType } = useContext(CoachContext) as CoachProvider
    const { hasName, pokemonsTypesOptions } = props
    const classes = useStyles()

    const handlePokemonType = (event: SelectChangeEvent) => {
        setPokemonType(event.target.value)
    }

    const handleCoachName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    return (
        <Grid item>
            {hasName ? (
                <>
                    <FormControl fullWidth>
                        <Select
                            classes={{
                                root: classes.selectRoot,
                                select: classes.select,
                                icon: classes.selectIcon
                            }}
                            defaultValue=""
                            onChange={handlePokemonType}
                            IconComponent={KeyboardArrowDownIcon}
                            variant="standard"
                            renderValue={(value) => {
                                const pokemonTypeFound = pokemonsTypesOptions.find(
                                    (type: PokemonTypes) => type.name === value
                                )
                                return (
                                    <List component="div" disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar src={pokemonTypeFound?.thumbnailImage} alt={value} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={capitalizeString(value)}
                                                primaryTypographyProps={{
                                                    fontSize: '1.3rem'
                                                }}
                                            />
                                        </ListItemButton>
                                    </List>
                                )
                            }}
                        >
                            {pokemonsTypesOptions.map((option) => (
                                <MenuItem value={option.name} key={option.name}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <List component="div" disablePadding>
                                            <ListItem>
                                                <ListItemButton
                                                    classes={{
                                                        root: classes.root,
                                                        selected: classes.selected
                                                    }}
                                                    alignItems="center"
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar src={option.thumbnailImage} alt={option.name} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={capitalizeString(option.name)} />
                                                </ListItemButton>
                                                {pokemonType === option.name ? (
                                                    <img src="static/images/radio-on.png" alt="Radio on" />
                                                ) : (
                                                    <img src="static/images/radio-off.png" alt="Radio off" />
                                                )}
                                            </ListItem>
                                        </List>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            ) : (
                <TextField
                    autoFocus
                    fullWidth
                    color="info"
                    variant="standard"
                    onChange={handleCoachName}
                    sx={{
                        '.css-1x51dt5-MuiInputBase-input-MuiInput-input': {
                            color: 'white',
                            fontSize: '1.8rem'
                        },
                        '.MuiInput-root:before, .MuiInput-root:after, .MuiInput-root:hover:not(.Mui-disabled):before': {
                            borderBottomWidth: '.3rem',
                            borderBottomColor: 'white'
                        }
                    }}
                />
            )}
        </Grid>
    )
}
