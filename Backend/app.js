import userRoutes from './routes/userRoute.js'
import recipeRoutes from './routes/recipeRoute.js'
import express from 'express'
import cors from 'cors'

//var session = require('express-session')
import session from 'express-session'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
//Creating API for user
app.use('/api/users', userRoutes)

app.use('/api/recipes',recipeRoutes);

export default app
