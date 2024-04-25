import * as ctr from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


router.route('/').get(ctr.getUsers)
//router.route('/').post(ctr.createUser)

router.route('/:id').get(ctr.getUserById)


export default router
