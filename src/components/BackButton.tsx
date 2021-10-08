import React from 'react'
import { Grid, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { BackButtonProps } from '../models/BackButton'

export const BackButton = (props: BackButtonProps) => {
    const { onClickHeader } = props
    return (
        <Grid container justifyContent="flex-start">
            <Grid item>
                <IconButton
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={onClickHeader}
                >
                    <ArrowBackIosIcon fontSize="large" sx={{ color: 'white' }} />
                </IconButton>
            </Grid>
        </Grid>
    )
}
