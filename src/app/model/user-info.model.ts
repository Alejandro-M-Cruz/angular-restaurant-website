export interface UserInfo {
  [key: string]: string | Date | undefined
  uid: string
  email: string
  creationDate?: Date
  lastLogInDate?: Date
}
