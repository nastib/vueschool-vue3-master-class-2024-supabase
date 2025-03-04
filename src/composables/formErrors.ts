import type {  LoginForm, RegisterForm, RealtimeErrors } from '@/types';
import type { AuthError } from '@supabase/supabase-js';

const { validateEmail, validatePassword, validateConfirmPassword, validateCharNumberRequired } = useFormValidations()

export function useFormErrors() {
  const realtimeErrors = ref<RealtimeErrors>()
  const serverError = ref<string>()

  function handleServerError (error: AuthError)  {
    serverError.value =
      error.message === 'Invalid login credentials'
        ? 'Incorrect email or password'
        : error.message
  }

  async function handleLoginFormErrors (formData: LoginForm) {

    realtimeErrors.value = {
      email: [],
      password: []
    }

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors

  }

  async function handleRegisterFormErrors (formData: RegisterForm) {

    realtimeErrors.value = {
      email: [],
      password:  [],
      confirm_password: [],
      first_name: [],
      last_name: [],
      username: [],
    }

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors

    const confirmPasswordErrors = validateConfirmPassword(formData.confirm_password, formData.password)
    if (confirmPasswordErrors.length) realtimeErrors.value.confirm_password = confirmPasswordErrors

    const usernameErrors = validateCharNumberRequired(formData.username, 5)
    if (usernameErrors.length) realtimeErrors.value.username = usernameErrors

    const firstNameErrors = validateCharNumberRequired(formData.first_name, 3)
    if (firstNameErrors.length) realtimeErrors.value.first_name = firstNameErrors

    const lastNameErrors = validateCharNumberRequired(formData.last_name, 3)
    if (lastNameErrors.length) realtimeErrors.value.last_name = lastNameErrors
  }

  return {
    handleLoginFormErrors,
    handleRegisterFormErrors,
    handleServerError,
    realtimeErrors,
    serverError,
  };
}
