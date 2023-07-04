import { render, screen, fireEvent } from '@testing-library/react'

import { SkeletonLoading } from '..'

describe('SkeletonLoading', () => {
  it('should set skeleton state to false when image is loaded', () => {
    render(<SkeletonLoading src='test.jpg' alt='Test Alt' />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    expect(screen.getByTestId('image')).toHaveAttribute('src', 'test.jpg')

    const image = screen.getByTestId('image')
    fireEvent.load(image)

    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
  })
})
