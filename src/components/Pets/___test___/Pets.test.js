import { render, screen } from '@testing-library/react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import catsMock from '../../../moks/cats.json'

import { Pets } from '../Pets'

// import userEvent from '@testing-library/user-event'

const server = setupServer(
  rest.get('http://localhost:4000/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock))
  }),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Pets', () => {
  test('should render the correct amount of cards', async () => {
    render(<Pets />)

    const cards = await screen.findAllByRole('article') //find can work whit async await

    expect(cards.length).toBe(5)
  })
})
