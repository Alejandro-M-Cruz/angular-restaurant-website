/*import {auth} from '../firebase'

function firestoreUserRecordToUser(user: any) {
  return {
    uid: user.uid,
    username: user.displayName,
    email: user.email,
    creationDate: new Date(user.metadata.creationTime),
    lastLogInDate: new Date(user.metadata.lastSignInTime)
  }
}

export class Users {
  static async getUsers() {
    try {
      const usersList = await auth.listUsers()
      return usersList.users.map(firestoreUserRecordToUser)
    } catch (e: any) {
      return { error: e.message }
    }
  }

  static async getUserById(uid: string) {
    try {
      const user = await auth.getUser(uid)
      return firestoreUserRecordToUser(user)
    } catch (e: any) {
      return { error: e.message }
    }
  }
}*/

