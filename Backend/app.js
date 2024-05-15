import userRoutes from './routes/userRoute.js'
import recipeRoutes from './routes/recipeRoute.js'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
//Creating API for user
app.use('/api/users', userRoutes)

app.use('/api/recipes',recipeRoutes);

export default app
