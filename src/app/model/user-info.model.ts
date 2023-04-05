export interface UserInfo {
  [key: string]: string | Date | undefined
  email: string
  creationDate?: Date
  lastLogInDate?: Date
}
