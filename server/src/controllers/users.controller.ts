import {auth} from "../firebase";

export default class UsersController {
  static async userExists(uid: string): Promise<boolean> {
    try {
      const userRecord = await auth.getUser(uid)
      return !!userRecord
    } catch(e: any) {
      return false
    }
  }

  static async getUsers(req, res) {
    try {
      const usersList = await auth.listUsers()
      res.json(usersList.users.map(UsersController.firestoreUserRecordToUser))
    } catch (e: any) {
      res.json({ error: e.message })
    }
  }

  static async getUserById(req, res) {
    try {
      const userRecord = await auth.getUser(req.params.uid)
      res.json(UsersController.firestoreUserRecordToUser(userRecord))
    } catch (e: any) {
      res.json({ error: e.message })
    }
  }

  private static firestoreUserRecordToUser(userRecord: any) {
    return {
      uid: userRecord.uid,
      username: userRecord.displayName,
      email: userRecord.email,
      creationDate: new Date(userRecord.metadata.creationTime),
      lastLogInDate: new Date(userRecord.metadata.lastSignInTime)
    }
  }
}
