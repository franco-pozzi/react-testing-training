import { useState } from 'react'
import validator from 'validator'

function App() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!validator.isEmail(signupInput.email)) {
      return setError('The email you input is invalid')
    }
    if (signupInput.password.length < 5) {
      return setError(
        'The password you entered should contain 5 or more character.',
      )
    }
    if (signupInput.password !== signupInput.confirmPassword) {
      return setError('The password don t match.Try again.')
    }
    return setError('')
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
