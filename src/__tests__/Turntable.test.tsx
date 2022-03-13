import React from 'react'
import { Turntable } from './index'
import { render } from '@testing-library/react'

const mockProps = {
  images: ['image 1', 'image 2', 'image 3', 'image 4'],
}

describe('Turntable', () => {
  it('should not render any images if no images are passed as props', () => {
    const { queryByAltText } = render(<Turntable images={[]} />)

    expect(queryByAltText('turntable image 0')).toBeNull()
  })

  it('should render helper text if no images are passed as props', () => {
    const { getByText } = render(<Turntable images={[]} />)

    expect(getByText('Your gonna need to add your images...')).toBeTruthy()
  })

  it('should render 4 images if 4 image URLs are passed as props', () => {
    const { container } = render(<Turntable images={mockProps.images} />)
    const images = container.getElementsByTagName('img')

    expect(images.length).toEqual(mockProps.images.length)
  })
})
