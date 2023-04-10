import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cors from 'cors'

const API = '/api/v1'
const PORT = 3000

import usersRoutes from './routes/users.routes'
import complaintsRoutes from "./routes/complaints.routes";
import menuRoutes from "./routes/menu.routes";

app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(API + '/users', usersRoutes)
app.use(API + '/complaints', complaintsRoutes)
app.use(API + '/menu', menuRoutes)

app.get('*', (_req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
