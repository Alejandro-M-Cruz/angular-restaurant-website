import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes'
import ordersRoutes from './routes/orders.routes'
import emailConfirmationsRoutes from './routes/email-confirmations.routes'

const API = '/api/v1'
const PORT = 3000
const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.use(API + '/users', usersRoutes)
app.use(API + '/orders', ordersRoutes)
app.use(API + "/email-confirmations", emailConfirmationsRoutes)


app.get('*', (req, res) => {
  res.sendStatus(404)
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)

})

/*functions.https.onRequest(app)*/
