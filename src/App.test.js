import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// test('render H1 error text', () => {
//   render(<App />)
//   const h1Element = screen.getByText(/Error/i)
//   expect(h1Element).toBeInTheDocument()
// })

test('All the input elements should be initialized empty', () => {
  // <= description of test
  //Logic
  render(<App />)

  const emailInputElement = screen.getByRole('textbox')

  const passwordInputElement = screen.getByLabelText('Password') //exact word

  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i) //whit regular expression match all diferences

  expect(emailInputElement.value).toBe('')

  expect(passwordInputElement.value).toBe('')

  expect(confirmPasswordInputElement.value).toBe('')
})

test('Should be able to type in email field', () => {
  render(<App />)

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })

  userEvent.type(emailInputElement, 'testing')

  expect(emailInputElement.value).toBe('testing')
})

test('Should be able to type in password field', () => {
  render(<App />)

  const passwordInputElement = screen.getByLabelText('Password')

  userEvent.type(passwordInputElement, 'testing')

  expect(passwordInputElement.value).toBe('testing')
})

test('Should be able to type in confirm password field', () => {
  render(<App />)

  const confirmPasswordInputElement = screen.getByLabelText('Confirm password')

  userEvent.type(confirmPasswordInputElement, 'testing')

  expect(confirmPasswordInputElement.value).toBe('testing')
})

test('Should be an error message on invalid email and initialy not error message', () => {
  render(<App />)

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i,
  )
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })
  const submitBtnElement = screen.getByRole('button', {
    name: 'Submit',
  })

  expect(emailErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement, 'error.com')
  userEvent.click(submitBtnElement)

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i,
  )

  expect(emailErrorElementAgain).toBeInTheDocument()
})

test('Should be an error message on invalid password and initialy not error message', () => {
  render(<App />)

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more character/i,
  )
  const passwordInputElement = screen.getByLabelText('Password')

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })

  const submitBtnElement = screen.getByRole('button', {
    name: 'Submit',
  })

  expect(passwordErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement, 'test@test.com')
  userEvent.type(passwordInputElement, 'test')
  userEvent.click(submitBtnElement)

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more character/i,
  )

  expect(passwordErrorElementAgain).toBeInTheDocument()
})

test('Should be an error message if passwords not match and initialy not error message', () => {
  render(<App />)

  const confirmPasswordErrorElement = screen.queryByText(
    /the password don t match try again/i,
  )

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })

  const passwordInputElement = screen.getByLabelText('Password')

  const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

  const submitBtnElement = screen.getByRole('button', {
    name: 'Submit',
  })

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()

  userEvent.type(emailInputElement, 'test@test.com')
  userEvent.type(passwordInputElement, '12345')
  userEvent.type(confirmpasswordInputElement, '123456')

  userEvent.click(submitBtnElement)

  const confirmPasswordErrorElementAgain = screen.queryByText(
    'The password don t match.Try again.',
  )

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
})

test('Should not be an error message if all is ok', () => {
  render(<App />)

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })

  const passwordInputElement = screen.getByLabelText('Password')

  const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

  const submitBtnElement = screen.getByRole('button', {
    name: 'Submit',
  })

  userEvent.type(emailInputElement, 'test@test.com')
  userEvent.type(passwordInputElement, '12345')
  userEvent.type(confirmpasswordInputElement, '12345')

  userEvent.click(submitBtnElement)

  const confirmPasswordErrorElement = screen.queryByText(
    'The password don t match.Try again.',
  )
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more character/i,
  )
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i,
  )

  expect(confirmPasswordErrorElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  expect(emailErrorElement).not.toBeInTheDocument()
})
