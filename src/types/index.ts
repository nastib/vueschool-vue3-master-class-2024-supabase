
export interface ILinkProp {
  title: string
  to?: string
  icon: string
}

export interface IPayment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export * from './database.types.d'

export * from './authForm.types.d'

export interface CustomError extends Error {
  customCode?: number
  detail?: string
  pgCode?: string
}

/**
 *
 */


export interface RealtimeErrors {
    email?: string[]
    password?: string[]
    confirm_password?: string[]
    first_name?: string[]
    last_name?: string[]
    username?: string[]
 }


export interface LoginForm  {
    email: string,
    password: string,
  }

export interface RegisterForm extends LoginForm {
    confirm_password: string,
    first_name: string,
    last_name: string,
    username: string,
}

export type FormErrors<T> = {
  [Property in keyof T]: string[]
}
