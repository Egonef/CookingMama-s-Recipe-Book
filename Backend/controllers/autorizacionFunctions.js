import {status} from '../controllers/userController.js'
import {getAdmin} from '../controllers/userController.js'

// Middleware de autenticación básico
export function getAuth(req, res, next) {
    try {
        const { loggedIn } =  status(req, res);
        if (loggedIn === true) {
            next();
        } else {
            return res.status(403).send({ error: 'Unauthorized content' });
        }
    } catch (error) {
        return res.status(403).send({ error: 'Unauthorized content' });
    }
}

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