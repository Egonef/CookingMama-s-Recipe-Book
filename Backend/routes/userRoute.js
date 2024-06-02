import * as ctr from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


router.route('/').get(ctr.getUsers)


router.route('/login').post(ctr.login)
router.route('/register').post(ctr.register)


//Funciones adicionales de logout y comprobacion de usuario
router.route('/logout').post(ctr.logout)

router.route('/status').get(ctr.status)

router.route('/:id').get(ctr.getUserById)

export default router
