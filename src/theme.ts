import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const pokemonTheme = createTheme({
    breakpoints: {
        values: {
            xs: 400,
            sm: 414,
            md: 828,
            lg: 1242,
            xl: 1400
        }
    },
    palette: {
        warning: {
            main: '#F11E76'
        },
        info: {
            main: grey[50]
        }
    }
})
export default pokemonTheme
