import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'

    // GETS GENERICOS

///api/users
export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

///api/users/:id
//getUserById function to retrieve user by id
export const getUserById  = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})

    // LOGIN
///api/users/login
export const login  = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        // Si el usuario no existe, responde con un mensaje de error
        res.status(404).json({message: "Invalid email"})
    }

    // Verifica si la contraseña proporcionada coincide con la contraseña almacenada
    const isPasswordValid = password == existingUser.password;

    if (!isPasswordValid) {
        // Si la contraseña no coincide, responde con un mensaje de error
        res.status(404).json({message: "Invalid password"})
    }

    res.status(201).json(existingUser);
})

    // REGISTER
//api/users/register
export const register  = asyncHandler(async(req, res) => {
    const { firstName, secondName, userName, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
        firstName,
        secondName,
        userName,
        email,
        password, 
        isAdmin: isAdmin || false,
    });

    // Guarda el nuevo usuario en la base de datos
    await newUser.save();
    //TODO comprobar si hay errores al guardar
    // Responde con el nuevo usuario creado
    res.status(201).json(newUser);
})
 