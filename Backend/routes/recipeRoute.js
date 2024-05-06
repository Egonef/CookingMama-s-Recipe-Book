import * as ctr from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()



router.route('/popular').get(ctr.getRecipes)
router.route('/:id').get(ctr.getRecipeById)
router.route('/ingredient/:ingredient').get(ctr.getRecipeByIngredient)
// Rutas para salvar
router.route('/saved').get(ctr.getRecipesSavedByUser)

router.route('/saved').post(ctr.setRecipeSavedByUser)
router.route('/saved').delete(ctr.setRecipeUnsavedByUser)
//Rutas para recetas propias
router.route('/myOwn/').get(ctr.getRecipesCreatedByUser)

router.route('/myOwn/').post(ctr.publishRecipe)
router.route('/myOwn/').patch(ctr.draftRecipe)
router.route('/myOwn/').delete(ctr.deleteOwnRecipe)







export default router
