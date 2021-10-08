import React from 'react'
import { Alert, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ToastPosition, ToastProps } from '../models/Components'

const TOAST_POSITION: Readonly<ToastPosition> = { vertical: 'top', horizontal: 'right' }

export default function Toast(props: ToastProps) {
    const { isOpen, onClose, message, type, duration } = props

    const action = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

    return (
        <Snackbar
            onClose={onClose}
            open={isOpen}
            autoHideDuration={duration}
            action={action}
            anchorOrigin={TOAST_POSITION}
        >
            <Alert variant="filled" severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
