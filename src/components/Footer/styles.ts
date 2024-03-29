import styled from 'styled-components'

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #24293f;
  padding: 1.5rem 0;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`

export const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: 0.75rem;
    line-height: 150%;
    font-weight: 400;
  }
`

export const SocialMediaContainer = styled.ul`
  display: flex;
  gap: 0.5rem;
`

export const Link = styled.a.attrs({ target: '_blank' })`
  display: block;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 2rem;
    height: 2rem;
  }
`
