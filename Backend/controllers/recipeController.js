import Recipe from '../models/recipesModel.js'
import asyncHandler from 'express-async-handler'

// Devolvera una lista estatica de recetas por ahora

//Abi
export const getRecipes = asyncHandler(async(req, res) => {
    const recipe = await Recipe.find({})
    console.log(recipe)
    if(recipe){
        res.status(200).json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
        console.error('Recipe not found')
    }
})

export const getRecipeById  = asyncHandler(async(req, res) => {
    const id = req.params.id
    const recipe = await Recipe.findById(id)

    if(recipe){
        res.json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
        res.status(404)
        throw new Error('Recipe not found')
    }
})

//Abi
export const getRecipesSavedByUser  = asyncHandler(async(req, res) => {
    //const id = req.params.id
    //const recipe = await User.find({id:id},"saved").populate
    res.status(404)
})
//Migui
export const setRecipeSavedByUser  = asyncHandler(async(req, res) => {
    //TODO
    res.status(404)
})
//Migui
export const setRecipeUnsavedByUser  = asyncHandler(async(req, res) => {
    //TODO
    res.status(404)
})
//Migui
export const getRecipesCreatedByUser  = asyncHandler(async(req, res) => {
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
