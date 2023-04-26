import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'


const API = '/api/v1'
const PORT = 3000

import usersRoutes from './routes/users.routes'

app.use(cors({
  origin: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (_req, res) => {
  res.send('Welcome, admin')
})

app.use(API + '/users', usersRoutes)

app.get('*', (_req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

/*functions.https.onRequest(app)*/
