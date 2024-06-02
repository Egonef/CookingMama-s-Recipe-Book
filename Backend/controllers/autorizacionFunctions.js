import {checkStatus} from '../controllers/userController.js'
import {getAdmin} from '../controllers/userController.js'
import asyncHandler from 'express-async-handler'




// Middleware de autenticación para administradores
export function getAuthAdmin(req, res, next) {
    try {
        const { loggedIn } =  status(req, res);
        const isAdmin =  getAdmin(req, res);
        
        if (loggedIn === true && isAdmin === true) {
            next();
        } else {
            return res.status(403).send({ error: 'Unauthorized content' });
        }
    } catch (error) {
        return res.status(403).send({ error: 'Unauthorized content' });
    }
}