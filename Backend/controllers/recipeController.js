
import Recipe from '../models/recipesModel.js'
import User from '../models/usersModel.js'
import Ingredient from '../models/ingredientsModel.js'
import asyncHandler from 'express-async-handler'
import *  as api from './apiFunctions.js'




// GETS GENERICOS

///api/recipes/popular
export const getRecipes = asyncHandler(async(req, res) => {
    const recipes = await Recipe.find().sort({ popularity: -1 });
    //console.log("recetas recibidas:" + recipes);
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
    
    if(recipe){
        recipe.popularity = (recipe.popularity || 0) + 1;
        await recipe.save();

        res.json(recipe)
    }else{
        res.status(404).json({message: "Recipe not found"})
    }
    
    
})

///api/recipes/ingredients/:ingredient
export const getRecipeByIngredient  = asyncHandler(async(req, res) => {
    const ingredientName = req.params.ingredient.charAt(0).toUpperCase()+ req.params.ingredient.slice(1);
    // TODO Hay que actualizar el valor del array de RecipeIds de un Ingrediente cada vez que
    // añada una receta con dicho ingrediente 
    console.log("nombre ingrediente: " + ingredientName)
    // Busca el ingrediente por su nombre
    const ingredient = await Ingredient.findOne({ name: ingredientName });

    if (ingredient == null ) {
        res.status(404).json({ message: "Ingredient not found" });
        return 
    }

    // Obtiene los IDs de las recetas asociadas con este ingrediente
    const recipeIds = ingredient.recipeIds;

    // Busca las recetas que tienen el ID del ingrediente
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    if (recipes && recipes.length > 0) {
        //recipes.popularity = (recipes.popularity || 0) + 1;
        //await recipes.save();
        res.json(recipes);
    } else {
        res.status(404).json({ message: "Recipes not found" });
        throw new Error('Recipes not found');
    }
})

export const obtenerRecetas = async (ingredientName) => {
    try {
        // Buscar el ingrediente en la base de datos
        const ingredient = await Ingredient.findOne({ name: ingredientName });

        if (!ingredient) {
            throw new Error('Ingredient not found');
        }

        // Obtener los IDs de las recetas asociadas con este ingrediente
        const recipeIds = ingredient.recipeIds;

        // Buscar las recetas que tienen el ID del ingrediente
        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        if (recipes && recipes.length > 0) {
            return (recipes);
        } else {
            return []; // Devolver un array vacío si no se encuentran recetas
        }
    } catch (error) {
        console.error('Error obteniendo recetas:', error);
        throw new Error('Error obteniendo recetas');
    }
};

    //BUSCAR Y FILTRAR RECETAS
    // Caché para almacenar las recetas
    let cachedRecipes = [];


    ///api/recipes/ingredients?ingredients=
    export const findRecipesByIngredients = asyncHandler(async(req, res) => {
        // Comprueba si las recetas ya están en caché
        if (cachedRecipes.length > 0) {
        // Si las recetas están en caché, devuelve el resultado
            return res.json(cachedRecipes);
        }

        const ingredients = req.query.ingredients ? req.query.ingredients.split(',').map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)) : [];

        if (ingredients.length === 0) {
            return res.status(400).json({ message: "Please provide at least one ingredient" });
        }
    
        try {
            // Array para almacenar las recetas de cada ingrediente
            let allRecipes = []; 
    
            // Recorrer los ingredientes y obtener las recetas de cada uno
            for (const ingredient of ingredients) {
                try {
                    // Reasignar cachedRecipes antes de asignarle los nuevos resultados
                    cachedRecipes = [];
                    const recipes = await obtenerRecetas(ingredient);
                    allRecipes.push(recipes);
                } catch (error) {
                    console.error(`Error retrieving recipes for ingredient "${ingredient}":`, error);
                    // Si no se encuentran recetas para un ingrediente, agregar un array vacío
                    allRecipes.push([]);
                }
            }
            // Calcular la intersección de todas las recetas
            const commonRecipes = allRecipes.reduce((acc, recipes) => {
                if (acc === null) {
                    return recipes;
                }
                const recipeIds = recipes.map(recipe => recipe._id.toString());
                return acc.filter(recipe => recipeIds.includes(recipe._id.toString()));
            }, null);

            //Extraer recetas de la API Spoonacular
            const APIRecipes = await api.searchRecipesAndTranslate(ingredients);
            const Recipes =commonRecipes.concat(APIRecipes);
    
            if (Recipes.length === 0) {
                res.status(404).json({ message: "No recipes found with all specified ingredients" });
            } else {
                // Guarda las recetas en caché
                cachedRecipes = Recipes;
                console.log(cachedRecipes);
                res.json(Recipes);
            }
        } catch (error) {
            console.error('Error getting recipes by multiple ingredients:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    ///api/recipes/filter?ingredients=...&maxReadyTime=...&cuisine=...
    export const filterRecipes = asyncHandler(async(req, res) => {     
        // Usa las recetas almacenadas en caché
        const Recipes = cachedRecipes;      
        const cuisine = req.query.cuisine;
        const maxReadyTime = req.query.maxReadyTime ? parseInt(req.query.maxReadyTime) : null;
        /**if (ingredients.length === 0) {
            return res.status(400).json({ message: "Please provide at least one ingredient" });
        }**/
        try{

        //const Recipes = await findRecipesByIngredients(req, res);
            if (Recipes.length ===0) {
                return res.status(404).json({ message: "Recipes not found" });
            }
            // Filtrar recetas por cuisine y maxReadyTime
                let filteredRecipes = Recipes;
                if (cuisine) {
                    filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase());
                }
                if (maxReadyTime) {
                    filteredRecipes = filteredRecipes.filter(recipe => recipe.maxReadyTime <= maxReadyTime);
                }
                
                if (filteredRecipes.length === 0) {
                    res.status(404).json({ message: "No recipes found matching the filters" });
                } else {
                    res.json(filteredRecipes);
                } 
        }catch (error) {
            console.error('Error filtering recipes:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    });


    // RECETAS GUARDADAS

////api/recipes/saved
//Ver guardadas
export const getRecipesSavedByUser  = asyncHandler(async(req, res) => {
    
    //const userId = req.query.userID;
    //console.log("User id" + userId);
    
    const user = await User.findById(userId);
    
    if(!user){
        res.status(404)
        return
    }
    const recipes = await User.findById(userId).populate('favoriteRecipes').exec();
    console.log("Saved recipes" + recipes)
    return res.status(200)
   
    
})

////api/recipes/saved
//Guardar
export const setRecipeSavedByUser  = asyncHandler(async(req, res) => {
    
    const userId = req.query.userID;
    //console.log("user: " + userId)
    const recipeId  = req.query.recipeID;
    
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
        
        if (user.favoriteRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Receta ya salvada por usuario' });
        }

        // Guardar la receta en el array de recetas guardadas del usuario
        user.favoriteRecipes.push(recipeId);
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
    
    const userId = req.query.userID;
    //console.log("user: " + userId)
    const recipeId  = req.query.recipeID;
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
        if (!user.favoriteRecipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Receta no salvada por el usuario' });
        }

        // Eliminar la receta del array de recetas guardadas del usuario
        user.favoriteRecipes.remove(recipeId);
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
    const userId = req.query.userID;
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

// Asociar recetas a ingredientes
export const updateIngredients = asyncHandler(async (req, res) => {
    try {
        const recipes = await Recipe.find();

        for (const recipe of recipes) {
            for (const recipeIngredient of recipe.ingredients) {
                const ingredientName = recipeIngredient.name;
                let ingredient = await Ingredient.findOne({ name: ingredientName });

                if (ingredient) {
                    // Si el ingrediente ya existe, agrega el ID de la receta si no está ya presente
                    if (!ingredient.recipeIds) {
                        ingredient.recipeIds = [];
                    }
                    if (!ingredient.recipeIds.includes(recipe._id.toString())) {
                        ingredient.recipeIds.push(recipe._id.toString());
                        await ingredient.save();
                    }
                } else {
                    // Si el ingrediente no existe, crea uno nuevo con el ID de la receta
                    ingredient = new Ingredient({
                        name: ingredientName,
                        recipeIds: [recipe._id.toString()]
                    });
                    await ingredient.save();
                }
            }
        }
        res.status(200).json({ message: "Ingredients updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating ingredients" });
        console.error('Error updating ingredients', error);
    }
});
