import React from 'react'
import { Box, CssBaseline, Container } from '@mui/material'

interface Props {
    children: JSX.Element
}

export const AppLayout: React.FC<Props> = ({ children }: Props) => {
    return (
        <Box
            component="main"
            sx={{
                height: '100vh',
                flexGrow: 1,
                overflow: 'auto',
                background: 'no-repeat cover',
                backgroundImage: 'url(static/images/bg@3x.png)'
            }}
        >
            <CssBaseline />
            <Container sx={{ mt: 4, mb: 4 }}>{children}</Container>
        </Box>
    )
}
