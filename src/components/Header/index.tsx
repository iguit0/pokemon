import * as C from './styles'
import { ReactComponent as PokemonLogo } from '../../assets/logo-pokemon.svg'

export const Header = () => {
  return (
    <div className='main-container' data-testid='header-component'>
      <C.Container>
        <PokemonLogo data-testid='pokemon-logo' />
      </C.Container>
    </div>
  )
}
