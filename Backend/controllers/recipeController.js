
import Recipe from '../models/recipesModel.js'
import User from '../models/usersModel.js'
import Ingredient from '../models/ingredientsModel.js'
import asyncHandler from 'express-async-handler'
import axios from 'axios';



// FUNCIONES DE LLAMADA A LA API DE TRADUCCIÓN

const apiKeyTranslation = '1940e7c5-d32c-426d-9ce4-78f5eb26cff7:fx';

async function translateText(text, targetLanguage) {
    try {
        const response = await axios.post(`https://api-free.deepl.com/v2/translate`, null, {
            params: {
                text: text,
                target_lang: targetLanguage,
                auth_key: apiKeyTranslation
            }
        });

        const translatedText = response.data.translations[0].text;
        //console.log(`Translated Text: ${translatedText}`);
        return translatedText;
    } catch (error) {
        if (error.response && error.response.status === 402) { // 402 Payment Required
            console.warn(`API Key ${apiKey} has reached its limit.`);
        }else {
        console.error('Error translating text:', error);
        }
    }
}

async function translateIngredients(ingredients, targetLanguage) {
    const translatedIngredients = await Promise.all(
        ingredients.map(ingredient => translateText(ingredient, targetLanguage))
    );
    return translatedIngredients;
}

// FUNCIONES DE LLAMADA A LA API DE RECETAS

const apiKeys = [
    '8c222ad1eedf45abb083854da2ed6d48',
    '320b591ffc074aa3bb69573f63430599'
];

async function APIsearchRecipesByIngredients(ingredients) {
    let ApiIdRecipes = [];

    // Primer ciclo: Buscar recetas por ingredientes
    for (let apiKey of apiKeys) {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
                params: {
                    apiKey: apiKey,
                    ingredients: ingredients.join(','),
                    number: 5
                }
            });

            // Extraer y devolver los IDs de las recetas
            ApiIdRecipes = response.data.map(recipe => recipe.id);
            break; // Sal del ciclo si la consulta fue exitosa
        } catch (error) {
            if (error.response && error.response.status === 402) { // 402 Payment Required
                console.warn(`API Key ${apiKey} has reached its limit.`);
            } else {
                console.error('Error al buscar recetas:', error);
                break; // Sal del ciclo si ocurre un error que no sea relacionado con el límite de la API
            }
        }
    }

    let APIRecipes = [];

    // Segundo ciclo: Obtener detalles de cada receta
    if (ApiIdRecipes.length > 0) {
        for (let apiKey of apiKeys) {
            try {
                const recipesPromises = ApiIdRecipes.map(async (id) => {
                    const recipeDetailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                        params: {
                            apiKey: apiKey,
                            includeNutrition: false // No incluir información nutricional para simplificar la respuesta
                        }
                    });

                    const recipeDetails = recipeDetailsResponse.data;
                    return {
                        id: recipeDetails.id,
                        title: recipeDetails.title,
                        instructions: recipeDetails.instructions,
                        ingredients: recipeDetails.extendedIngredients.map(ingredient => ingredient.original),
                        photo: recipeDetails.image,
                        cuisineType: recipeDetails.cuisines.join(', '),
                        preparationTime: recipeDetails.readyInMinutes,
                        allergens: recipeDetails.allergens || []
                    };
                });

                // Esperar a que todas las solicitudes de recetas se completen
                APIRecipes = await Promise.all(recipesPromises);
                break; // Sal del ciclo si la consulta fue exitosa
            } catch (error) {
                if (error.response && error.response.status === 402) { // 402 Payment Required
                    console.warn(`API Key ${apiKey} has reached its limit.`);
                } else {
                    console.error('Error al buscar detalles de recetas:', error);
                    break; // Sal del ciclo si ocurre un error que no sea relacionado con el límite de la API
                }
            }
        }
    }

    return APIRecipes;
}

//FUNCIONES DE TRANSFORMACION DE RESULTADO DE LA API

function transformIngredients(ingredient) {
    // Limpiar el nombre del ingrediente para eliminar información irrelevante
    const irrelevantWords = [
        'finamente picad[oa]s?', 'finamente cortad[oa]s?', 'picad[oa]s?', 'cortad[oa]s?', 'enlatad[oa]s?', 'rallad[oa]s?', 'madur[oa]s?','triturad[oa]s?',
        'rebanad[oa]s?', 'aplastad[oa]s?', 'molid[oa]s?', 'enter[oa]s?', 'fresco[s]?', 'grand[ea]s?', 'pequeñ[oa]s?', 'median[oa]s?', 'extr[ae]',
        'pintado[s]?', 'roj[oa]s?', 'verde[s]?', 'amarill[oa]s?', 'blanc[oa]s?', 'negro[s]?', 'azul[ea]s?', 'gris[ea]s?', 'morad[oa]s?', 'marrón[ea]s?',
        'dorad[oa]s?', 'platead[oa]s?', 'turques[ae]s?', 'naranj[oa]s?'];

    // Crear una expresión regular que elimine las palabras irrelevantes
    const irrelevantWordsRegex = new RegExp(`\\b(${irrelevantWords.join('|')})\\b`, 'gi');
    const cleanedIngredient = ingredient.replace(irrelevantWordsRegex, '').replace(/\s\s+/g, ' ').trim();
    
    return {
        name: cleanedIngredient,
        quantity: '',
        unit: ''
    };
}

function cleanTitle(title) {
    // Remove parts of the title that are not part of the actual title
    return title.replace(/:.*$/, '');
}

async function searchRecipesAndTranslate(ingredients) {
    try {
        // Traducir ingredientes al inglés antes de buscar recetas
        const translatedIngredients = await translateIngredients(ingredients, 'EN');

        // Buscar recetas con los ingredientes traducidos
        const recipes = await APIsearchRecipesByIngredients(translatedIngredients);

        // Traducir los campos necesarios de las recetas al español
        const translatedRecipes = await Promise.all(recipes.map(async recipe => {
            const translatedTitle = await translateText(recipe.title, 'ES');
            const translatedInstructions = await translateText(recipe.instructions, 'ES');
            const translatedIngredients = await Promise.all(
                recipe.ingredients.map(ingredient => translateText(ingredient, 'ES'))
            );
            const translatedCuisine = await translateText(recipe.cuisineType, 'ES');

            return {
                id: recipe.id,
                title: translatedTitle,
                instructions: translatedInstructions,
                ingredients: translatedIngredients,
                photo: recipe.photo,
                cuisineType: translatedCuisine,
                preparationTime: recipe.preparationTime,
                allergens: recipe.allergens
            };
        }));

        // Transformar las recetas traducidas
        const transformedRecipes = translatedRecipes.map(recipe => ({
            title: cleanTitle(recipe.title),
            cuisine: recipe.cuisineType || 'Not specified',
            ingredients: recipe.ingredients.map(transformIngredients),
            steps: recipe.instructions.replace(/(<\/?[^>]+>|\\n|\\r|\\t)/g, ""),
            image: recipe.photo,
            maxReadyTime: recipe.preparationTime,
            intolerances: recipe.allergens.join(', ') || '',
            popularity: 0 // Default value
        }));

        return transformedRecipes;
    } catch (error) {
        console.error('Error searching and translating recipes:', error);
        throw error;
    }
}

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

    //BUSCAR RECETAS
    ///api/recipes/ingredients?ingredients=
    export const findRecipesByIngredients = asyncHandler(async(req, res) => {
        //const ingredients = req.query.ingredients ? req.query.ingredients.split(',') : [];
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
                    //const response = await axios.get(`/api/recipes/ingredients/${ingredient}`);
                    //const recipes = response.data;
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
            const APIRecipes = await searchRecipesAndTranslate(ingredients);
            const Recipes =commonRecipes.concat(APIRecipes);
    
            if (Recipes.length === 0) {
                res.status(404).json({ message: "No recipes found with all specified ingredients" });
            } else {
                res.json(Recipes);
            }
        } catch (error) {
            console.error('Error getting recipes by multiple ingredients:', error);
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
