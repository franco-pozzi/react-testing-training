import { Cards } from './components/Cards/Cards'
import cats from './moks/cats.json'

function App() {
  return (
    <>
      <Cards cats={cats} />
    </>
  )
}

export default App
