import * as ctr from "../controllers/recipeController.js";
import express from 'express'
import * as auth from "../controllers/userController.js";
const router = express.Router()

//Rutas de popularidad
router.route('/popular').get(ctr.getRecipes)
router.route('/incrementPopularity/:id').get(ctr.incrementPopularity)


//Solicitud GET a http://localhost:5000/api/recipes/find?ingredients=Pollo&cuisine=Internacional&maxReadyTime=30
router.route('/find').get(ctr.getRecipeByIngredientAndFilter)



// Rutas para salvar
router.route('/saved').get( ctr.getRecipesSavedByUser)
router.route('/saved').post(ctr.setRecipeSavedByUser)
router.route('/saved').delete(auth.getAuth, ctr.setRecipeUnsavedByUser)

//Rutas para recetas propias
router.route('/myOwn/').get(auth.getAuth, ctr.getRecipesCreatedByUser)
router.route('/myOwn/').post(auth.getAuth, ctr.publishRecipe)
router.route('/myOwn/').patch(auth.getAuth, ctr.draftRecipe)
router.route('/myOwn/').delete(auth.getAuth, ctr.deleteOwnRecipe)

//Rutas auxiliares
router.route('/updateIngs').get(ctr.updateIngredients)
router.route('/:id').get(ctr.getRecipeById)




export default router
