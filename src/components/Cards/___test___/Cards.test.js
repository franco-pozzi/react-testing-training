import { render, screen } from '@testing-library/react'
import { Cards } from '../Cards'
import cats from '../../../moks/cats.json'
// import userEvent from '@testing-library/user-event'

describe('Cards', () => {
  test('should render five card components', () => {
    render(<Cards filterCats={cats} />)

    expect(screen.getAllByRole('article').length).toBe(5)
  })
})
