export function useFormValidations() {

   function validateEmail (email?: string){
    if (!email) return []

    const trimmedEmail = email.trim()
    if (!trimmedEmail) return []

    const errors = []

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    const isValidEmailFormat = emailRegex.test(trimmedEmail)

    if (!isValidEmailFormat) errors.push('Not a valid email format')

    return errors
  }

   function validatePassword (password?: string) {
    if (!password) return []

    const errors = []

    if (password.length <= 6)
      errors.push('Password must be more than 6 characters')
    return errors
  }

  function validateConfirmPassword (confirmPassword?: string, password?: string) {
    if (!confirmPassword) return []

    const errors = []

    if (confirmPassword !== password )
      errors.push('confirmation password does not match')
    return errors
  }

  function validateCharNumberRequired( textInput?: string, charNumber?: number) {
    if (!textInput) return []

    const errors = []

    if (textInput.length <= (charNumber ? charNumber : 0))
      errors.push(`Field must be more than ${charNumber} characters`)
    return errors
}
return {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCharNumberRequired
}
  }

