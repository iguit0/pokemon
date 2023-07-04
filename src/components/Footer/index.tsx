import * as C from './styles'
import { BsLinkedin, BsGithub, BsTelegram } from 'react-icons/bs'

const SocialMedia = () => {
  return (
    <C.SocialMediaContainer>
      <li>
        <C.Link href='https://www.linkedin.com/in/igor-lucio-alves'>
          <BsLinkedin color='#fff' />
        </C.Link>
      </li>
      <li>
        <C.Link href='https://github.com/iguit0'>
          <BsGithub color='#fff' />
        </C.Link>
      </li>
      <li>
        <C.Link href='https://t.me/iguit0'>
          <BsTelegram color='#fff' />
        </C.Link>
      </li>
    </C.SocialMediaContainer>
  )
}

export const Footer = () => {
  return (
    <div className='main-container'>
      <C.Container>
        <C.Copy>
          <span>&copy; All rights reserved to Nintendo & The Pokemon Company</span>
          <span>
            Powered by{' '}
            <a href='https://pokeapi.co/' target='_blank' rel='noreferrer'>
              pokeapi.co
            </a>
          </span>
        </C.Copy>
        <SocialMedia />
      </C.Container>
    </div>
  )
}
