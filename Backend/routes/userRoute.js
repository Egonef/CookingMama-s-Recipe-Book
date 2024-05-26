import * as ctr from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


router.route('/').get(ctr.getUsers)
router.route('/:id').get(ctr.getUserById)

router.route('/login').post(ctr.login)
router.route('/register').post(ctr.register)


export default router
