# Testing in React boilerplate

### Forms

src/FormTest

- All the input elements should be initialized empty.
- Should be able to type in email field.
- Should be able to type in password field.
- Should be able to type in confirm password field.
- Should be an error message on invalid email and initialy not error message.
- Should be an error message on invalid password and initialy not error message.
- Should be an error message if passwords not match and initialy not error message.
- Should not be an error message if all is ok.

### Components whit props

src/components/Card

- Should show name of cat
- Should show phone number
- Should show email
- Should show image with correct src
- Should show image outlined heart
- Should show image filled heart
- Should toggle heart status

### Multiple Elements

src/components/Cards

- Should render five card components

### Handling and Mocking HTTP requests

src/components/Pets

- Should render the correct amount of cards

### Integration Test

src/components/Pets

- Should filter for male cats
- Should filter for female cats
- Should filter for favoured cats
- Should filter for not favoured cats
