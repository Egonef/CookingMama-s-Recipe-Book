
import Recipe from '../models/recipesModel.js'
import User from '../models/usersModel.js'
import Ingredient from '../models/ingredientsModel.js'
import asyncHandler from 'express-async-handler'



    // GETS GENERICOS

///api/recipes/popular
export const getRecipes = asyncHandler(async(req, res) => {
    const recipes = await Recipe.find();
    console.log("recetas recibidas:" + recipes);
    if(recipes){
        res.status(200).json(recipes);
    }else{
        res.status(404).json({message: "Recipe not found"});
        console.error('Recipe not found');
    }
})

////api/recipes/:id
export const getRecipeById  = asyncHandler(async(req, res) => {

    
        const id = req.params.id
    const recipe = await Recipe.findById(id)
    console.log("receta recibida:" + recipe);
    if(recipe){
        recipe.popularity = (recipe.popularity || 0) + 1;
        await recipe.save();

        res.json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
    }
    
    
})

///api/recipes/ingredient/:ingredient
export const getRecipeByIngredient  = asyncHandler(async(req, res) => {
    const ingredientName = req.params.ingredient;
    //Hay que actualizar el valor del array de RecipeIds de un Ingrediente cada vez que
    // añada una receta con dicho ingrediente

    // Busca el ingrediente por su nombre
    const ingredient = await Ingredient.findOne({ name: ingredientName });

    if (!ingredient) {
        res.status(404).json({ message: "Ingredient not found" });
        return 
    }

    // Obtiene los IDs de las recetas asociadas con este ingrediente
    const recipeIds = ingredient.recipeIds;

    // Busca las recetas que tienen el ID del ingrediente
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    if (recipes && recipes.length > 0) {
        recipes.popularity = (recipes.popularity || 0) + 1;
        await recipes.save();

        res.json(recipes);
    } else {
        res.status(404).json({ message: "Recipes not found" });
        throw new Error('Recipes not found');
    }
})


    // RECETAS GUARDADAS

////api/recipes/saved
//Ver guardadas
export const getRecipesSavedByUser  = asyncHandler(async(req, res) => {
    //TODO
    res.status(404)
})

////api/recipes/saved
//Guardar
export const setRecipeSavedByUser  = asyncHandler(async(req, res) => {
    
    const userId = req.query.userID;
    //console.log("user: " + userId)
    const recipeId  = req.query.recipeID;
    //console.log("recipe: " + recipeId)
    try {
        // Encontrar al usuario por su ID
        const user = await User.findById(userId);

        if (!user || user.length==0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const recipe = await Recipe.findById(recipeId);

        if(!recipe || recipe.length==0){
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        
        //TODO esta comprobación no funciona
        // Verificar si la receta ya está guardada por el usuario
        if (!user.favoriteRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Receta ya salvada por usuario' });
        }

        // Guardar la receta en el array de recetas guardadas del usuario
        user.savedRecipes.push(recipeId);
        await user.save();

        res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

////api/recipes/saved
//Desguardar
export const setRecipeUnsavedByUser  = asyncHandler(async(req, res) => {
    //TODO cambiar como se reccibe los argumentos
    const userId = req.user.id;
    const { recipeId } = req.body;
    try {
        // Encontrar al usuario por su ID
        const user = await User.findById(userId);

        if (!user || user.length == 0 ) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const recipe = await Recipe.findById(recipeId);

        if(!recipe || recipe.length == 0){
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Verificar si la receta no está guardada por el usuario
        if (!user.savedRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'La receta no está guardada en el usuario' });
        }

        // Eliminar la receta del array de recetas guardadas del usuario
        user.savedRecipes.remove(recipeId);
        await user.save();

        res.status(200).json({ message: 'Recipe saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


    // RECETAS DE USUARIO

////api/recipes/myOwn
// Ver recetas propias
export const getRecipesCreatedByUser  = asyncHandler(async(req, res) => {
    //cambiar como se recibe los argumentos
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userRecipes = await Recipe.find({ _id: { $in: user.ownRecipes } });
        res.status(200).json(userRecipes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    const user = await User.findById(userId);
    res.status(404)
})

////api/recipes/myOwn
// Publicar recetas
export const publishRecipe  = asyncHandler(async(req, res) => {
    res.status(404)
    //TODO completar
})

////api/recipes/myOwn
// Crear borradores recetas
export const draftRecipe  = asyncHandler(async(req, res) => {
    res.status(404)
    //TODO
})

////api/recipes/myOwn
// Eliminar recetas propias
export const deleteOwnRecipe = asyncHandler(async(req, res) => {
    res.status(404)
    //TODO
})

//Anadir receta (No existe como tal en los casos de uso. Sería de administrador)
export const addRecipe = asyncHandler(async (req, res) => {

    //TODO
});
