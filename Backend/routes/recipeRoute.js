import { getRecipes, getRecipeById , addRecipe } from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getRecipes)

// express router method to create route for getting users by id
router.route('/find/:id').get(getRecipeById)

router.route('/agregar').get(addRecipe)

export default router
