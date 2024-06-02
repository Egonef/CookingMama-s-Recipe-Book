import userRoutes from './routes/userRoute.js'
import recipeRoutes from './routes/recipeRoute.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

//var session = require('express-session')
import session from 'express-session'

const app = express()

app.use((req, res, next) => {
  console.log('Session desde app:', req.session);
  next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(session({
    name: "nombre",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false , sameSite: 'none'},
    maxAge: 600000
  }));

app.use(express.json()) //Sirve para que se puedan conger argumentos del body directamente
//Creating API for user
app.use('/api/users', userRoutes)

app.use('/api/recipes',recipeRoutes);

export default app
