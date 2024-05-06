import Recipe from '../models/recipesModel.js'
import User from '../models/usersModel.js'
import Ingredient from '../models/ingredientsModel.js'
import asyncHandler from 'express-async-handler'

// Devolvera una lista estatica de recetas por ahora

//Abi
export const getRecipes = asyncHandler(async(req, res) => {
    const recipe = await Recipe.find();
    if(recipe){
        res.status(200).json(recipe);
    }else{
        res.status(404).json({message: "Recipe not found"});
        console.error('Recipe not found');
    }
})

export const getRecipeById  = asyncHandler(async(req, res) => {
    const id = req.params.id
    //const id = 1
    const recipe = await Recipe.findOne({"id":id})
    console.log("receta recibida:" + recipe);
    if(recipe){
        res.json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
        res.status(404)
        throw new Error('Recipe not found')
    }
})

export const getRecipeByIngredient  = asyncHandler(async(req, res) => {
    const ingredientName = req.params.ingredient;

    // Busca el ingrediente por su nombre
    const ingredient = await Ingredient.findOne({ name: ingredientName });

    if (!ingredient) {
        res.status(404).json({ message: "Ingredient not found" });
        throw new Error('Ingredient not found');
    }

    // Obtiene los IDs de las recetas asociadas con este ingrediente
    const recipeIds = ingredient.recipeIds;

    // Busca las recetas que tienen el ID del ingrediente
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    if (recipes && recipes.length > 0) {
        res.json(recipes);
    } else {
        res.status(404).json({ message: "Recipes not found" });
        throw new Error('Recipes not found');
    }
})

//Abi
export const getRecipesSavedByUser  = asyncHandler(async(req, res) => {
    //const id = req.params.id
    //const recipe = await User.find({id:id},"saved").populate
    res.status(404)
})
//Migui
//Guardar
export const setRecipeSavedByUser  = asyncHandler(async(req, res) => {
    //TODO
    const userId = req.user.id;
    const { recipeId } = req.body;
    try {
        // Encontrar al usuario por su ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const recipe = await Recipe.findById(recipeId);

        if(!recipe){
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Verificar si la receta ya está guardada por el usuario
        if (user.savedRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already saved by user' });
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
//Migui
//Desguardar
export const setRecipeUnsavedByUser  = asyncHandler(async(req, res) => {
    //TODO
    const userId = req.user.id;
    const { recipeId } = req.body;
    try {
        // Encontrar al usuario por su ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const recipe = await Recipe.findById(recipeId);

        if(!recipe){
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
//Migui
export const getRecipesCreatedByUser  = asyncHandler(async(req, res) => {
   
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

export const publishRecipe  = asyncHandler(async(req, res) => {
    res.status(404)
})

export const draftRecipe  = asyncHandler(async(req, res) => {
    res.status(404)
})

export const deleteOwnRecipe = asyncHandler(async(req, res) => {
    res.status(404)
})
//Abi o Migui
export const addRecipe = asyncHandler(async (req, res) => {

    //TODO

    // Extraer los datos de la receta del cuerpo de la solicitud
    //const { title, description, ingredients, instructions } = req.body;

    // Muestra de ejemplo
    const newRecipeData = {
        title: 'Tarta de manzana',
        description: 'Deliciosa tarta de manzana casera',
        ingredients: ['manzanas', 'azúcar', 'harina', 'mantequilla'],
        instructions: '1. Pelar y cortar las manzanas...\n2. Mezclar el azúcar, la harina y la mantequilla...\n3. Hornear a 180°C durante 45 minutos...'
    };

    // Crear una nueva instancia de Recipe con los datos proporcionados
    const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        instructions
    });

    // Guardar la nueva receta en la base de datos
    const createdRecipe = await newRecipe.save();

    // Responder con la nueva receta creada
    res.status(201).json(createdRecipe);
});
