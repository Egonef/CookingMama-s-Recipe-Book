import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'


// Tus rutas van aquí
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
    if (existingUser == null ) {
        // Si el usuario no existe, responde con un mensaje de error
        return res.status(405).json({message: "Invalid email"})
    }

    // Verifica si la contraseña proporcionada coincide con la contraseña almacenada
    const isPasswordValid = password == existingUser.password;

    if (!isPasswordValid) {
        // Si la contraseña no coincide, responde con un mensaje de error
        return res.status(406).json({message: "Invalid password"})
    }

    req.session.user=existingUser;

    //console.log(req.session.user)
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
    req.session.user=newUser;
    res.status(201).json(newUser);
})

export const getAdmin = asyncHandler(async(req, res) => {
    if (req.session.user.isAdmin == true)
        res.send(true);
    else
        res.send(false)
});

export const logout = asyncHandler(async(req, res) =>{
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
    });
})


/*
export const status = asyncHandler(async(req,res) => {
    console.log("Entro en funcion status")
    console.log("req.session.user: ",req.session.user)
    if (req.session.user != null) {
        return { loggedIn: true };
    } else {
        return { loggedIn: false };
    }
})
*/





// Función para comprobar el estado de autenticación
export async function checkStatus(req) {
    console.log("Entro en funcion checkStatus")
    console.log(req.session.user)
    if (req.session.user != null) {

        return { loggedIn: true, user: req.session.user };
    } else {
        return { loggedIn: false };
    }
}


export const getAuth = asyncHandler(async(req, res, next) => {
    /*
    console.log("Entro en getAuth");
    console.log("Valor de req en auth: " + req)
    console.log("req.session: ",req.session)
    console.log("req.session.user: ",req.session.user)
    */
    try {
        const loggedIn = await checkStatus(req); // Usar la nueva función de verificación
        console.log("loggedIn: ", loggedIn);
        if (loggedIn === true) {
            next(); // Pasa al siguiente middleware o manejador de ruta
        } else {
            return res.status(403).send({ error: 'Unauthorized content' }); // Devuelve una respuesta de error
        }
    } catch (error) {
        return res.status(403).send({ error: 'Error' +error}); // Devuelve una respuesta de error en caso de excepción
    }
});

// Middleware para responder con el estado de autenticación
export const status = asyncHandler(async (req, res) => {
    console.log("Entro en funcion status");
    console.log("req fuera del if: "+ req.session.user)
    const statusResult = await checkStatus(req);
    console.log("statusResult logged: ",statusResult.loggedIn)
    console.log("statusResult user: ",statusResult.user)
    if (statusResult.loggedIn) {
        console.log("req dentro del if: "+ req.session.user)
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(201).json({ loggedIn: false });
    }
});

/*
export const localStatus = asyncHandler(async(req,res) => {
    console.log("Entro en funcion status")
    console.log("req.session.user: ",req.session.user)
    if (req.session.user != null) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(201).json({ loggedIn: false });
    }
})
*/
