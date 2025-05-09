export interface FormLogin {
  email: string,
  password: string,
}

export interface FormRegister extends FormLogin {
  username: string,
  first_name: string,
  last_name: string,
  confirm_password: string,
}
