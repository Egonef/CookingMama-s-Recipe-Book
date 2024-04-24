import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()



router.route('/').get(getUsers)
router.route('/').post(createUser)

router.route('/:id').get(getUserById)


export default router
