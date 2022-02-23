import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import catsMock from '../../../moks/cats.json'

import { Pets } from '../Pets'

const server = setupServer(
  rest.get('http://localhost:4000/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock))
  }),
)

const setupRender = () => render(<Pets />)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Pets', () => {
  test('should render the correct amount of cards', async () => {
    setupRender()

    const cards = await screen.findAllByRole('article') //find can work whit async await

    expect(cards.length).toBe(5)
  })

  test('Should filter for male cats', async () => {
    render(<Pets />)

    const cards = await screen.findAllByRole('article')

    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male')

    expect(screen.getAllByRole('article')).toStrictEqual([cards[1], cards[3]])
  })

  test('Should filter for female cats', async () => {
    setupRender()

    const cards = await screen.findAllByRole('article')

    userEvent.selectOptions(screen.getByLabelText('Gender'), 'female')

    expect(screen.getAllByRole('article')).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ])
  })

  test('Should filter for favoured cats', async () => {
    setupRender()

    const cards = await screen.findAllByRole('article')

    const btnForFirstCard = within(cards[0]).getByRole('button')
    const btnForFurthCard = within(cards[3]).getByRole('button')

    userEvent.click(btnForFirstCard)
    userEvent.click(btnForFurthCard)

    userEvent.selectOptions(screen.getByLabelText('Favourite'), 'favoured')

    expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]])
  })

  test('Should filter for not favoured cats', async () => {
    setupRender()

    const cards = await screen.findAllByRole('article')

    const btnForFirstCard = within(cards[0]).getByRole('button')
    const btnForFurthCard = within(cards[3]).getByRole('button')

    userEvent.click(btnForFirstCard)
    userEvent.click(btnForFurthCard)

    userEvent.selectOptions(screen.getByLabelText('Favourite'), 'not favoured')

    expect(screen.getAllByRole('article')).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ])
  })
})
