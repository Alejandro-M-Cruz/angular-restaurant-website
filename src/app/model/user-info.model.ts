export interface UserInfo {
  [key: string]: string | Date | undefined
  uid: string
  username: string
  email: string
  creationDate?: Date
  lastLogInDate?: Date
}
