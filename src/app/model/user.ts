export class User {
  [key: string]: string | Date | undefined
  static readonly USERNAME_MAX_LENGTH = 32
  static readonly PASSWORD_MIN_LENGTH = 8
  static readonly PASSWORD_MAX_LENGTH = 16
  uid!: string
  username!: string
  email!: string
  creationDate?: Date
  lastLogInDate?: Date
}
