import * as ctr from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()



router.route('/recipes/popular').get(ctr.getRecipes)
router.route('/recipe/:id').get(ctr.getRecipeById)
// Rutas para salvar
router.route('/recipe/saved').get(ctr.getRecipesSavedByUser)

router.route('/recipe/saved').post(ctr.setRecipeSavedByUser)
router.route('/recipe/saved').delete(ctr.setRecipeUnsavedByUser)
//Rutas para recetas propias
router.route('/recipe/myOwn/').get(ctr.getRecipesCreatedByUser)

router.route('/recipe/myOwn/').post(ctr.publishRecipe)
router.route('/recipe/myOwn/').patch(ctr.draftRecipe)
router.route('/recipe/myOwn/').delete(ctr.deleteOwnRecipe)







export default router
