import React from 'react'
import { Grid, Box, Typography, Modal, IconButton, Tooltip } from '@mui/material'
import { DialogProps } from '../models/Components'

const style = {
    position: 'absolute' as const,
    backgroundColor: '#f5f5f5',
    width: 650,
    top: '50%',
    left: '50%',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    border: '2px solid #000',
    boxShadow: 24,
    outline: 'none',
    p: 4
}

export default function Dialog(props: DialogProps) {
    const { isOpen, onClose, pokemon } = props

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5" fontWeight={700}>
                            {pokemon?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Close" placement="top">
                            <IconButton onClick={onClose} size="large">
                                <img src="static/images/close.png" alt="Close icon modal" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Abilities:</strong> {pokemon?.abilities?.join(', ')}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Weakness:</strong> {pokemon?.weakness?.join(', ')}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Height:</strong> {pokemon?.height}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Weight:</strong> {pokemon?.weight} lbs
                        </Typography>
                        <Typography sx={{ mt: 2 }}>
                            <strong>Type:</strong> {pokemon?.type?.join(', ')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img width={192} height={192} src={pokemon.thumbnailImage} alt={pokemon.thumbnailAltText} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
