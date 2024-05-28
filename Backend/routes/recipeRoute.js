import * as ctr from "../controllers/recipeController.js";
import express from 'express'
const router = express.Router()


router.route('/popular').get(ctr.getRecipes)

router.route('/ingredients/:ingredient').get(ctr.getRecipeByIngredient)
//Solicitud GET a /recipes/ingredients?ingredients=tomate,ajo,aceite.
router.route('/ingredients').get(ctr.findRecipesByIngredients)

//Solicitud GET a /recipes/ingredients/filter?ingredients=tomate,ajo&maxReadyTime=25&cuisine=Mediterranea
//router.route('/ingredients/filter').get(ctr.filterRecipes)

//Solicitud GET a /recipes/filter?ingredients=tomate,ajo&maxReadyTime=25&cuisine=Mediterranea
router.route('/filter').get(ctr.filterRecipes)



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
