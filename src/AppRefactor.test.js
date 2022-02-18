import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const setup = () => render(<App />)

// // beforeEach(()=>{
// // for initialize, this run before each test
// // })

// afterEach(()=>{
//    for cleaning, this run after
// })

// beforeAll(()=>{
// run once before all of the test
// })

// afterAll(()=>{
// run once after all of the test
// })

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i, //chek in labelText
  })
  const passwordInputElement = screen.getByLabelText('Password')

  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)

  if (email) {
    userEvent.type(emailInputElement, email)
  }
  if (password) {
    userEvent.type(passwordInputElement, password)
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: 'Submit',
  })

  userEvent.click(submitBtnElement)
}

describe('App-Test', () => {
  test('All the input elements should be initialized empty', () => {
    setup()

    const emailInputElement = screen.getByRole('textbox')

    const passwordInputElement = screen.getByLabelText('Password') //exact word

    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i) //whit regular expression match all diferences

    expect(emailInputElement.value).toBe('')

    expect(passwordInputElement.value).toBe('')

    expect(confirmPasswordInputElement.value).toBe('')
  })

  test('Should be able to type in email field', () => {
    setup()

    // const emailInputElement = screen.getByRole('textbox', {
    //   name: /email/i, //chek in labelText
    // })

    // userEvent.type(emailInputElement, 'testing')

    const { emailInputElement } = typeIntoForm({
      email: 'testing',
    })

    expect(emailInputElement.value).toBe('testing')
  })

  test('Should be able to type in password field', () => {
    setup()

    // const passwordInputElement = screen.getByLabelText('Password')

    // userEvent.type(passwordInputElement, 'testing')

    const { passwordInputElement } = typeIntoForm({
      password: 'testing',
    })

    expect(passwordInputElement.value).toBe('testing')
  })

  test('Should be able to type in confirm password field', () => {
    setup()

    // const confirmPasswordInputElement = screen.getByLabelText('Confirm password')

    // userEvent.type(confirmPasswordInputElement, 'testing')

    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: 'testing',
    })

    expect(confirmPasswordInputElement.value).toBe('testing')
  })

  describe('Error Handling', () => {
    // beforeEach(()=>{    We can use only in this block

    // })

    test('Should be an error message on invalid email and initialy not error message', () => {
      setup()

      const emailErrorElement = screen.queryByText(
        /the email you input is invalid/i,
      )
      // const emailInputElement = screen.getByRole('textbox', {
      //   name: /email/i, //chek in labelText
      // })
      // const submitBtnElement = screen.getByRole('button', {
      //   name: 'Submit',
      // })

      expect(emailErrorElement).not.toBeInTheDocument()

      // userEvent.type(emailInputElement, 'error.com')

      typeIntoForm({
        email: 'error.com',
      })

      // userEvent.click(submitBtnElement)
      clickOnSubmitButton()

      const emailErrorElementAgain = screen.queryByText(
        /the email you input is invalid/i,
      )

      expect(emailErrorElementAgain).toBeInTheDocument()
    })

    test('Should be an error message on invalid password and initialy not error message', () => {
      setup()

      const passwordErrorElement = screen.queryByText(
        /the password you entered should contain 5 or more character/i,
      )
      // const passwordInputElement = screen.getByLabelText('Password')

      // const emailInputElement = screen.getByRole('textbox', {
      //   name: /email/i, //chek in labelText
      // })

      // const submitBtnElement = screen.getByRole('button', {
      //   name: 'Submit',
      // })

      expect(passwordErrorElement).not.toBeInTheDocument()

      // userEvent.type(emailInputElement, 'test@test.com')
      // userEvent.type(passwordInputElement, 'test')
      typeIntoForm({
        email: 'test@test.com',
        password: 'test',
      })

      clickOnSubmitButton()

      const passwordErrorElementAgain = screen.queryByText(
        /the password you entered should contain 5 or more character/i,
      )

      expect(passwordErrorElementAgain).toBeInTheDocument()
    })

    test('Should be an error message if passwords not match and initialy not error message', () => {
      setup()

      const confirmPasswordErrorElement = screen.queryByText(
        /the password don t match try again/i,
      )

      // const emailInputElement = screen.getByRole('textbox', {
      //   name: /email/i, //chek in labelText
      // })

      // const passwordInputElement = screen.getByLabelText('Password')

      // const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

      // const submitBtnElement = screen.getByRole('button', {
      //   name: 'Submit',
      // })

      expect(confirmPasswordErrorElement).not.toBeInTheDocument()

      // userEvent.type(emailInputElement, 'test@test.com')
      // userEvent.type(passwordInputElement, '12345')
      // userEvent.type(confirmpasswordInputElement, '123456')

      typeIntoForm({
        email: 'test@test.com',
        password: '12345',
        confirmPassword: '123456',
      })

      // userEvent.click(submitBtnElement)

      clickOnSubmitButton()

      const confirmPasswordErrorElementAgain = screen.queryByText(
        'The password don t match.Try again.',
      )

      expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
    })

    test('Should not be an error message if all is ok', () => {
      setup()

      // const emailInputElement = screen.getByRole('textbox', {
      //   name: /email/i, //chek in labelText
      // })

      // const passwordInputElement = screen.getByLabelText('Password')

      // const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

      // const submitBtnElement = screen.getByRole('button', {
      //   name: 'Submit',
      // })

      // userEvent.type(emailInputElement, 'test@test.com')
      // userEvent.type(passwordInputElement, '12345')
      // userEvent.type(confirmpasswordInputElement, '12345')

      typeIntoForm({
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
      })

      // userEvent.click(submitBtnElement)

      clickOnSubmitButton()

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
  })
})

// test('All the input elements should be initialized empty', () => {
//   setup()

//   const emailInputElement = screen.getByRole('textbox')

//   const passwordInputElement = screen.getByLabelText('Password') //exact word

//   const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i) //whit regular expression match all diferences

//   expect(emailInputElement.value).toBe('')

//   expect(passwordInputElement.value).toBe('')

//   expect(confirmPasswordInputElement.value).toBe('')
// })

// test('Should be able to type in email field', () => {
//   setup()

//   // const emailInputElement = screen.getByRole('textbox', {
//   //   name: /email/i, //chek in labelText
//   // })

//   // userEvent.type(emailInputElement, 'testing')

//   const { emailInputElement } = typeIntoForm({
//     email: 'testing',
//   })

//   expect(emailInputElement.value).toBe('testing')
// })

// test('Should be able to type in password field', () => {
//   setup()

//   // const passwordInputElement = screen.getByLabelText('Password')

//   // userEvent.type(passwordInputElement, 'testing')

//   const { passwordInputElement } = typeIntoForm({
//     password: 'testing',
//   })

//   expect(passwordInputElement.value).toBe('testing')
// })

// test('Should be able to type in confirm password field', () => {
//   setup()

//   // const confirmPasswordInputElement = screen.getByLabelText('Confirm password')

//   // userEvent.type(confirmPasswordInputElement, 'testing')

//   const { confirmPasswordInputElement } = typeIntoForm({
//     confirmPassword: 'testing',
//   })

//   expect(confirmPasswordInputElement.value).toBe('testing')
// })

// test('Should be an error message on invalid email and initialy not error message', () => {
//   setup()

//   const emailErrorElement = screen.queryByText(
//     /the email you input is invalid/i,
//   )
//   // const emailInputElement = screen.getByRole('textbox', {
//   //   name: /email/i, //chek in labelText
//   // })
//   // const submitBtnElement = screen.getByRole('button', {
//   //   name: 'Submit',
//   // })

//   expect(emailErrorElement).not.toBeInTheDocument()

//   // userEvent.type(emailInputElement, 'error.com')

//   typeIntoForm({
//     email: 'error.com',
//   })

//   // userEvent.click(submitBtnElement)
//   clickOnSubmitButton()

//   const emailErrorElementAgain = screen.queryByText(
//     /the email you input is invalid/i,
//   )

//   expect(emailErrorElementAgain).toBeInTheDocument()
// })

// test('Should be an error message on invalid password and initialy not error message', () => {
//   setup()

//   const passwordErrorElement = screen.queryByText(
//     /the password you entered should contain 5 or more character/i,
//   )
//   // const passwordInputElement = screen.getByLabelText('Password')

//   // const emailInputElement = screen.getByRole('textbox', {
//   //   name: /email/i, //chek in labelText
//   // })

//   // const submitBtnElement = screen.getByRole('button', {
//   //   name: 'Submit',
//   // })

//   expect(passwordErrorElement).not.toBeInTheDocument()

//   // userEvent.type(emailInputElement, 'test@test.com')
//   // userEvent.type(passwordInputElement, 'test')
//   typeIntoForm({
//     email: 'test@test.com',
//     password: 'test',
//   })

//   clickOnSubmitButton()

//   const passwordErrorElementAgain = screen.queryByText(
//     /the password you entered should contain 5 or more character/i,
//   )

//   expect(passwordErrorElementAgain).toBeInTheDocument()
// })

// test('Should be an error message if passwords not match and initialy not error message', () => {
//   setup()

//   const confirmPasswordErrorElement = screen.queryByText(
//     /the password don t match try again/i,
//   )

//   // const emailInputElement = screen.getByRole('textbox', {
//   //   name: /email/i, //chek in labelText
//   // })

//   // const passwordInputElement = screen.getByLabelText('Password')

//   // const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

//   // const submitBtnElement = screen.getByRole('button', {
//   //   name: 'Submit',
//   // })

//   expect(confirmPasswordErrorElement).not.toBeInTheDocument()

//   // userEvent.type(emailInputElement, 'test@test.com')
//   // userEvent.type(passwordInputElement, '12345')
//   // userEvent.type(confirmpasswordInputElement, '123456')

//   typeIntoForm({
//     email: 'test@test.com',
//     password: '12345',
//     confirmPassword: '123456',
//   })

//   // userEvent.click(submitBtnElement)

//   clickOnSubmitButton()

//   const confirmPasswordErrorElementAgain = screen.queryByText(
//     'The password don t match.Try again.',
//   )

//   expect(confirmPasswordErrorElementAgain).toBeInTheDocument()
// })

// test('Should not be an error message if all is ok', () => {
//   setup()

//   // const emailInputElement = screen.getByRole('textbox', {
//   //   name: /email/i, //chek in labelText
//   // })

//   // const passwordInputElement = screen.getByLabelText('Password')

//   // const confirmpasswordInputElement = screen.getByLabelText('Confirm password')

//   // const submitBtnElement = screen.getByRole('button', {
//   //   name: 'Submit',
//   // })

//   // userEvent.type(emailInputElement, 'test@test.com')
//   // userEvent.type(passwordInputElement, '12345')
//   // userEvent.type(confirmpasswordInputElement, '12345')

//   typeIntoForm({
//     email: 'test@test.com',
//     password: '123456',
//     confirmPassword: '123456',
//   })

//   // userEvent.click(submitBtnElement)

//   clickOnSubmitButton()

//   const confirmPasswordErrorElement = screen.queryByText(
//     'The password don t match.Try again.',
//   )
//   const passwordErrorElement = screen.queryByText(
//     /the password you entered should contain 5 or more character/i,
//   )
//   const emailErrorElement = screen.queryByText(
//     /the email you input is invalid/i,
//   )

//   expect(confirmPasswordErrorElement).not.toBeInTheDocument()
//   expect(passwordErrorElement).not.toBeInTheDocument()
//   expect(emailErrorElement).not.toBeInTheDocument()
// })
