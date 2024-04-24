import Recipe from '../models/recipesModel.js'
import asyncHandler from 'express-async-handler'

export const getRecipes = asyncHandler(async(req, res) => {
    //const recipes = await Recipe.find({})
    //res.json(recipes)
    res.json("Hola pepe")
})

export const getRecipeById  = asyncHandler(async(req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if(recipe){
        res.json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
        res.status(404)
        throw new Error('Recipe not found')
    }
})

export const addRecipe = asyncHandler(async (req, res) => {
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
