import dotenv from 'dotenv'
dotenv.config()
import app from './server'

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
