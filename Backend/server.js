import connectDB from './config/db.js'
import app from './app.js'
import dotenv  from 'dotenv'
import cors from 'cors'
//dotenv config
dotenv.config()

//Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Esto es para que pueda mandar peticiones de un puerto a otro y no se enfarruque
}))

const PORT = process.env.PORT || 5000
connectDB()

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))