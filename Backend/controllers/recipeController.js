
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


export const getRecipeByIngredientAndFilter  = asyncHandler(async(req, res) => {

    const ingredients = req.query.ingredients ? req.query.ingredients.split(',').map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1)) : [];  

    //console.log("ingredientes: " + ingredients)
    const cuisine = req.query.cuisine;
    const maxReadyTime = req.query.maxReadyTime ? parseInt(req.query.maxReadyTime) : null;
    const APIEnabled = req.query.api === 'true'

    if (ingredients.length === 0) {
        return res.status(400).json({ message: "Provea de por lo menos un ingrediente" });
    }

    let recetas = []

    //Busqueda de recetas
    try {
        
        const recetasBD = await obtenerRecetasConIngredientes(ingredients)
        recetas = recetas.concat(recetasBD)
        
        if(APIEnabled){
            console.log("Hecho uso de API\n")
            const recetasAPI = await api.searchRecipesAndTranslate(ingredients);
            console.log("recetas api: " + recetasAPI)
            recetas = recetas.concat(recetasAPI)
        }
        
        if (recetas.length === 0) {
            res.status(404).json({ message: "No recipes found with all specified ingredients" });
            return
        } 

    } catch (error) {
        console.error('Error getting recipes by multiple ingredients:', error);
        res.status(500).json({ message: "Internal server error: " + error });
    }
    //Filtrado de recetas

    recetas = filtrarRecetas(recetas,cuisine,maxReadyTime)

    if (recetas.length === 0) {
        res.status(404).json({ message: "No encontrada ninguna receta que cumplan con los filtros" });
        return
    }

    res.status(200).json(recetas)

})

export const obtenerRecetasConIngrediente = async (ingredientName) => {
    try {
        // Buscar el ingrediente en la base de datos
        const ingredient = await Ingredient.findOne({ name: ingredientName });

        if (!ingredient) {
            console.log('Ingredient not found')
            return []
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

    



export const obtenerRecetasConIngredientes = async (ingredients) => {
    let recipes = []
    for (const ingredient of ingredients) {
        try {
            const currRecipes = await obtenerRecetasConIngrediente(ingredient);
            recipes.push(currRecipes);
        } catch (error) {
            console.error(`Error retrieving recipes for ingredient "${ingredient}":`, error);
            // Si no se encuentran recetas para un ingrediente
        }
    }
    // Calcular la intersección de todas las recetas
    const commonRecipes = recipes.reduce((acc, recipes) => {
        if (acc === null) {
            return recipes;
        }
        const recipeIds = recipes.map(recipe => recipe._id.toString());//Porque lo vuelve en un par?
        return acc.filter(recipe => recipeIds.includes(recipe._id.toString()));
    }, null);
    return commonRecipes;
}


export const filtrarRecetas = (recipes,cuisine,maxReadyTime) => {

        let filteredRecipes = recipes;
        if (cuisine) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase());
        }
        if (maxReadyTime) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.maxReadyTime <= maxReadyTime);
        } 
    return filteredRecipes
}
    // RECETAS GUARDADAS

////api/recipes/saved
//Ver guardadas
export const getRecipesSavedByUser  = asyncHandler(async(req, res) => {
    
    const userId = req.query.userID;
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
    const recipeID = req.query.recipeID
    //borrar receta de propietarios
    const propietarios = await User.find({ ownRecipes: { $in: recipeID } });
    for (var propietario of propietarios){
        propietario.ownRecipes = propietario.ownRecipes.filter(item => item !== recipeID);
        propietario.save()
    }

    //borrar receta de quien tenga guardado la receta

    const guardadores = await User.find({ favoriteRecipes: { $in: recipeID } });
    for (var guardador of guardadores){
        guardador.favoriteRecipes = guardador.favoriteRecipes.filter(item => item !== recipeID);
        guardador.save()
    }
    //borrar ingredientes que referencien a esa receta
    const ingredientes = await Ingredient.find({ recipeIds: { $in: recipeID } });
    for(var ingrediente of ingredientes){
        ingrediente.recipeIds = ingrediente.recipeIds.filter(item => item !== recipeID);
        if(ingredient.recipeIds.length == 0 ){
           Ingredient.deleteOne({_id:ingrediente._id})
        }else{
            ingrediente.save()
        }
    }
    //borrar receta
    await Recipe.deleteOne({_id:recipeID})
    //bo
})

//Anadir receta (No existe como tal en los casos de uso. Sería de administrador)
export const addRecipe = asyncHandler(async (req, res) => {

    const {
        title,
        cuisine,
        ingredients,
        steps,
        image,
        maxReadyTime,
        intolerances,
        popularity,
        userId,
    } = req.body;

    // Validate the required fields
    if (!title || !cuisine || !ingredients || !steps || !image || !maxReadyTime) {
        res.status(400).json({message: 'Please provide all required fields' })
        throw new Error('Please provide all required fields');
    }

    // Check if the user already exists
    const user = await User.findById(userId);
    
    if(!user){
        res.status(401).json({message: "El usuario al que se refiere no existe"})
    }

    // Create a new recipe
    const recipe = new Recipe({
        title,
        cuisine,
        ingredients,
        steps,
        image,
        maxReadyTime,
        intolerances,
        popularity
    });
    // Save the recipe to the database
    const createdRecipe = await recipe.save();

    //asociar receta a usuario
    user.ownRecipes.push(createdRecipe._id)
    user.save()

    //actualizar ingredientes
    await actualizarIngredientes(createdRecipe)
    res.status(201).json(createdRecipe);

});

// Asociar recetas a ingredientes
export const updateIngredients = asyncHandler(async (req, res) => {
    try {
        const recipes = await Recipe.find();

        for (const recipe of recipes) {
            await actualizarIngredientes(recipe)
        }
        res.status(200).json({ message: "Ingredients updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating ingredients" + error });
        console.error('Error updating ingredients', error);
    }
});

export const actualizarIngredientes = async (recipe) => {

    for (const recipeIngredient of recipe.ingredients) {
        const ingredientName = recipeIngredient.name;
        let ingredient = await Ingredient.findOne({ name: ingredientName });

        if (ingredient) {
            // Si el ingrediente ya existe, agrega el ID de la receta si no está ya presente
            if (!ingredient.recipeIds) { //Esto nunca deberia pasar ya que toda receta deberia tener por lo menos una receta asociada
                ingredient.recipeIds = [];
            }
            console.log("receta recogida" + recipe);
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
