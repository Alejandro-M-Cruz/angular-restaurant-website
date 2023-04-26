/*import functions from 'firebase-functions'
import {firestore} from '../firebase'

functions.auth.user().onDelete(async user => {
  const userReservations = await firestore
    .collection('reservations')
    .where('userId', '==', user.uid)
    .get()
  userReservations.forEach(reservation => {
    reservation.ref.delete()
  })
})*/
