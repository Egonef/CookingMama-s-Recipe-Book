import * as ctr from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()


router.route('/popular').get(ctr.getRecipes)

router.route('/ingredient/:ingredient').get(ctr.getRecipeByIngredient)
//Solicitud GET a /recipes/ingredients?ingredients=tomate,ajo,aceite.
router.get('/recipes/ingredients', findRecipesByIngredients);


// Rutas para salvar
router.route('/saved').get(ctr.getRecipesCreatedByUser)

router.route('/saved').post(ctr.setRecipeSavedByUser)
router.route('/saved').delete(ctr.setRecipeUnsavedByUser)

//Rutas para recetas propias
router.route('/myOwn/').get(ctr.getRecipesCreatedByUser)

router.route('/myOwn/').post(ctr.publishRecipe)
router.route('/myOwn/').patch(ctr.draftRecipe)
router.route('/myOwn/').delete(ctr.deleteOwnRecipe)

router.route('/updateIngs').get(ctr.updateIngredients)
router.route('/:id').get(ctr.getRecipeById)




export default router
