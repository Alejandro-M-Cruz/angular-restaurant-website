import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users.routes'
import ordersRoutes from './routes/orders.routes'

const API = '/api/v1'
const PORT = 3000
const app = express()

app.use(express.static('public'))
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

app.get('*', (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

/*functions.https.onRequest(app)*/
