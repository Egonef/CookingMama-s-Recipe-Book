import { getRecipes, getRecipeById , addRecipe } from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()



router.route('/recipes/popular').get(getRecipes)
router.route('/recipe/:id').get(getRecipeById)
// Rutas para salvar
router.route('/recipe/saved').get(getRecipesSavedByUser)

router.route('/recipe/saved').post(setRecipeSavedByUser)
router.route('/recipe/saved').delete(setRecipeUnsavedByUser)
//Rutas para recetas propias
router.route('/recipe/myOwn/').get(getRecipesCreatedByUser)

router.route('/recipe/myOwn/').post(publishRecipe)
router.route('/recipe/myOwn/').patch(draftRecipe)
router.route('/recipe/myOwn/').delete(deleteOwnRecipe)







export default router
