import { render } from '@testing-library/react'
import { ErrorMessage } from '..'

describe('ErrorMessage', () => {
  it('renders the error message with the correct text', () => {
    const { getByText } = render(<ErrorMessage />)
    const errorMessage = getByText('Oops, none pokemon was found')
    expect(errorMessage).toBeInTheDocument()
  })

  it('renders the error message with the Pikachu image', () => {
    const { getByAltText } = render(<ErrorMessage />)
    const pikachuImage = getByAltText('Pikachu')
    expect(pikachuImage).toBeInTheDocument()
    expect(pikachuImage.getAttribute('src')).toBe('img-pikachu-sad-min.png')
    expect(pikachuImage.getAttribute('width')).toBe('32')
    expect(pikachuImage.getAttribute('height')).toBe('32')
  })
})
