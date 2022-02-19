import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import userEvent from '@testing-library/user-event'

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'laith@hotmail.com',
  image: {
    url: 'https://scontent.faep9-2.fna.fbcdn.net/v/t1.6435-9/103294918_122296689522377_925065091447130241_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-5&_nc_sid=e3f864&_nc_ohc=x7qdR6WGZGMAX_rrepm&_nc_ht=scontent.faep9-2.fna&oh=00_AT9vBwRci9mB8Mz-aVIs1PEGzzinlKKNPVwr16h5FENSeg&oe=6234AD69',
    alt: 'cute cat',
  },
  favoured: false,
}

const renderCardWhitProps = (testProps) =>
  render(<Card {...cardProps} {...testProps} />)

describe('Card', () => {
  test('Should show name of cat', () => {
    renderCardWhitProps()

    expect(
      screen.getByRole('heading', {
        name: 'Sydney',
      }),
    ).toBeInTheDocument()
  })

  test('Should show phone number', () => {
    renderCardWhitProps()

    expect(screen.getByText('111-111-1111')).toBeInTheDocument()
  })

  test('Should show email', () => {
    renderCardWhitProps()

    expect(screen.getByText('laith@hotmail.com')).toBeInTheDocument()
  })

  test('Should show image with correct src', () => {
    renderCardWhitProps()

    expect(screen.getByAltText('cute cat').src).toBe(cardProps.image.url)
  })

  test('Should show image outlined heart', () => {
    renderCardWhitProps()

    expect(screen.queryByAltText('filled heart')).not.toBeInTheDocument()
    expect(screen.getByAltText('outlined heart')).toBeInTheDocument()
  })

  test('Should show image filled heart', () => {
    renderCardWhitProps({ favoured: true })

    expect(screen.queryByAltText('outlined heart')).not.toBeInTheDocument()
    expect(screen.getByAltText('filled heart')).toBeInTheDocument()
  })

  test('Should toggle heart status', () => {
    renderCardWhitProps()

    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByAltText('outlined heart')).not.toBeInTheDocument()
    expect(screen.getByAltText('filled heart')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByAltText('filled heart')).not.toBeInTheDocument()
    expect(screen.getByAltText('outlined heart')).toBeInTheDocument()
  })
})
