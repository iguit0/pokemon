import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4.5rem 0;
  border-bottom: 1px solid #24293f;
  padding-bottom: 2.19rem;

  @media (max-width: 56.25rem) {
    flex-direction: column;
  }

  @media (max-width: 42.5rem) {
    margin: 3.5rem 0 3rem;
    padding-bottom: 1.5rem;
  }
`
