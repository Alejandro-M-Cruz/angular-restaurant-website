import express from 'express'
const app = express()
const API = '/api/v1'

import usersRoutes from './routes/users.routes'

app.use(express.json())
app.use(API + '/users', usersRoutes)


app.get('*', (_req, res) => {
  res.sendStatus(404)
})

export default app
