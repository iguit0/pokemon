import React, { useEffect, useCallback, useState, useContext } from 'react'
import {
    Box,
    Typography,
    Stack,
    Grid,
    Paper,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    ListItemSecondaryAction,
    Badge
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { makeStyles } from '@mui/styles'
import { grey } from '@mui/material/colors'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { styled } from '@mui/material/styles'
import { capitalizeString, pokemonKey, redirectToPokedex, removeDuplicated, sortPokemons } from '../utils/helper'
import { CoachContext } from '../context/CoachProvider'
import { CoachProvider } from '../models/Context'
import pokemonsList from '../data/pokemonsList.json'
import pokemonsTypesList from '../data/pokemonsTypesList.json'
import { Pokemon } from '../models/Pokemon'
import Dialog from '../components/Dialog'

const finalPokemonsList = removeDuplicated(pokemonsList)

const useStyles = makeStyles({
    ItemButtonRoot: {
        '&:hover': {
            backgroundColor: 'transparent',
            opacity: 0.5
        }
    },
    notFoundImg: {
        '-webkit-user-drag': 'none',
        '-khtml-user-drag': 'none',
        '-moz-user-drag': 'none',
        '-o-user-drag': 'none',
        userDrag: 'none',
        userSelect: 'none'
    }
})

const SmallAvatar = styled(Avatar)(() => ({
    width: 18,
    height: 18
}))

export const HomePage: React.FC = () => {
    const { name, pokemonType, setPokemonType } = useContext(CoachContext) as CoachProvider
    const [pokemonListByType, setPokemonListByType] = useState<Pokemon[]>([])
    const [searchName, setSearchName] = useState<string>()
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>({} as Pokemon)
    const [sortMode, setSortMode] = useState<string>('asc')
    const history = useHistory()

    const classes = useStyles()

    const handleOpenPokemon = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon)
        setIsOpenDialog(true)
    }

    const handleSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchName(event.target.value)
        },
        [setSearchName]
    )

    let pokemonListByName = !searchName
        ? pokemonListByType
        : pokemonListByType.filter((pokemon) =>
              pokemon.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase().trim())
          )

    const filterByType = useCallback(
        (type: string) => {
            let filtered = finalPokemonsList.filter((pokemon) => pokemon.type.includes(type))
            filtered = sortMode === 'asc' ? filtered.sort(sortPokemons) : filtered.sort(sortPokemons).reverse()
            setPokemonListByType(filtered)
        },
        [sortMode]
    )

    const handleChangeType = (typeName: string) => {
        filterByType(typeName)
        setPokemonType(typeName)
    }

    const sortByName = () => {
        const newMode = sortMode === 'asc' ? 'desc' : 'asc'
        setSortMode(newMode)
        pokemonListByName =
            newMode === 'asc' ? pokemonListByName.sort(sortPokemons) : pokemonListByName.sort(sortPokemons).reverse()
    }

    const renderActiveBadge = (selectedType: string) => {
        if (selectedType === pokemonType) {
            return (
                <SmallAvatar>
                    <img src="static/images/radio-on.png" alt="Selected type" />
                </SmallAvatar>
            )
        }
        return undefined
    }

    useEffect(() => {
        filterByType(pokemonType)
    }, [pokemonType, filterByType])

    useEffect(() => {
        if (name === '' || pokemonType === '') {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonType, name])

    return (
        <>
            <Grid container direction="column">
                <Grid item marginBottom={4}>
                    <Typography variant="h4" color="white" textAlign="center">
                        Pokemon Finder
                    </Typography>
                </Grid>

                <Paper style={{ padding: 15 }}>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            {pokemonsTypesList.results.map((type) => (
                                <IconButton key={type.name} onClick={() => handleChangeType(type.name)}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={renderActiveBadge(type.name)}
                                    >
                                        <Tooltip title={capitalizeString(type.name)} placement="top">
                                            <Avatar src={type.thumbnailImage} />
                                        </Tooltip>
                                    </Badge>
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item marginBottom={2} marginTop={2} md={12} lg={12} xl={12}>
                        <TextField
                            fullWidth
                            onChange={handleSearch}
                            placeholder="Search by pokemon name"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color={grey[500]} marginTop={1}>
                                Pokémon
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Tooltip title="Sort by name" placement="bottom">
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    disabled={pokemonListByName.length === 0}
                                    onClick={() => sortByName()}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle1" color={grey[500]} textAlign="right" marginRight={1}>
                                        Name
                                    </Typography>
                                    {sortMode === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginBottom: '2rem' }} />

                    <Grid item sm={12}>
                        <Stack direction="column" spacing={2}>
                            {pokemonListByName.length === 0 ? (
                                <Stack direction="column" spacing={4} alignItems="center">
                                    <img
                                        className={classes.notFoundImg}
                                        src="static/images/sad_squirtle.png"
                                        width={190}
                                        height={190}
                                        alt=""
                                    />
                                    <Typography variant="h6" textAlign="center">
                                        No pokemon found with this name <SentimentVeryDissatisfiedIcon />
                                    </Typography>
                                </Stack>
                            ) : (
                                pokemonListByName.slice(0, 10).map((pokemon) => (
                                    <Box
                                        key={pokemonKey(pokemon)}
                                        sx={{
                                            boxShadow:
                                                'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'
                                        }}
                                    >
                                        <List component="div" disablePadding>
                                            <ListItem onClick={() => handleOpenPokemon(pokemon)}>
                                                <ListItemButton
                                                    classes={{
                                                        root: classes.ItemButtonRoot
                                                    }}
                                                    alignItems="center"
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={pokemon.thumbnailImage}
                                                            alt={pokemon.thumbnailAltText}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={pokemon.name}
                                                        secondary={`#${pokemon.number}`}
                                                    />
                                                </ListItemButton>
                                                <Divider
                                                    orientation="vertical"
                                                    flexItem
                                                    sx={{
                                                        marginRight: '1rem'
                                                    }}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Tooltip title="Go to Pokedex" placement="top">
                                                        <IconButton
                                                            onClick={() => redirectToPokedex(pokemon?.detailPageURL)}
                                                        >
                                                            <OpenInNewIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Box>
                                ))
                            )}
                        </Stack>
                    </Grid>
                </Paper>
            </Grid>
            <Dialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} pokemon={selectedPokemon} />
        </>
    )
}
