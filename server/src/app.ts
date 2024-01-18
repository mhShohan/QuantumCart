import express from 'express'
import rootRoutes from './routes'

const PORT = 4000
const app = express()


//routes 
app.use('/api/v1', rootRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
})