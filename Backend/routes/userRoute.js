import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/users').get(getUsers)

// express router method to create route for getting users by id
router.route('/user/:id').get(getUserById)

export default router
