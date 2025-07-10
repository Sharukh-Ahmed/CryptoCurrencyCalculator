import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import coinRoutes from './routes/coinRoutes.js'
import { scheduleHistoryJob } from './cron.js'

dotenv.config()
const app = express()

const allowedOrigins = ['https://crypto-currency-calculator-nine.vercel.app','http://localhost:5173']
app.use(cors({origin: allowedOrigins}))
app.use(express.json())

app.get('/', (req, res)=> res.send("API is Working"));
app.use('/api', coinRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

app.listen(5000, () => console.log('Server running on port 5000'))
scheduleHistoryJob()
