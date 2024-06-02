import axios from 'axios';


// FUNCIONES DE LLAMADA A LA API DE TRADUCCIÓN

export async function translateText(text, idioma, targetLanguage) {
    const apiKeyTranslation = process.env.apiKeyTranslation
    //const translator = new deepl.Translator(apiKeyTranslation);
    //console.log(apiKeyTranslation);
    try {
        const response = await axios.post(`https://api-free.deepl.com/v2/translate`, null, {
            params: {
                text: text,
                target_lang: targetLanguage,
                source_lang: idioma,
                auth_key: apiKeyTranslation
            }
        });

        //const response = await translator.translateText(text, null, targetLanguage);

        //const translatedText = response.text;
        //console.log(response)
        //console.log(response.data)
        const translatedText = response.data.translations[0].text;
        //console.log(`Translated Text: ${translatedText}`);
        
        return translatedText;
    } catch (error) {
        if (error.response && error.response.status === 402) { // 402 Payment Required
            console.warn(`API Key ${apiKeyTranslation} has reached its limit.`);
        }else {
        console.error('Error translating text:', error);
        }
    }
}

export async function translateIngredients(ingredients, idioma, targetLanguage) {
    const translatedIngredients = await Promise.all(
        ingredients.map(ingredient => translateText(ingredient, idioma, targetLanguage))
    );
    return translatedIngredients;
}

// FUNCIONES DE LLAMADA A LA API DE RECETAS

const apiKeys = [
    process.env.apiKeysRecipe,
    process.env.apiKeysRecipe2,
    process.env.apiKeysRecipe3
];

export async function APIsearchRecipesByIngredients(ingredients) {
    let ApiIdRecipes = [];

    const apiKeys = [
        process.env.apiKeysRecipe,
        process.env.apiKeysRecipe2,
        process.env.apiKeysRecipe3
    ];

    // Primer ciclo: Buscar recetas por ingredientes
    for (let apiKey of apiKeys) {
        //console.log(apiKey)
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
                params: {
                    apiKey: apiKey,
                    ingredients: ingredients.join(','),
                    number: 5
                }
            });

            // Extraer y devolver los IDs de las recetas
            //console.log(response)
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
                        //id: recipeDetails.id,
                        id: "api",
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
        'dorad[oa]s?', 'platead[oa]s?', 'turques[ae]s?', 'naranj[oa]s?','sin espinas', 'sin piel', 'sazonados con un poco de sal y pimienta'];

    // Crear una expresión regular que elimine las palabras irrelevantes
    const irrelevantWordsRegex = new RegExp(`\\b(${irrelevantWords.join('|')})\\b`, 'gi');
    
    // Eliminar todo lo que va después de comas, guiones y lo que está entre paréntesis
    let cleanedIngredient = ingredient.replace(/,.*| -.*|\(.*?\)/g, '');

     // Eliminar palabras irrelevantes
     cleanedIngredient = cleanedIngredient.replace(irrelevantWordsRegex, '').replace(/\s\s+/g, ' ').trim();

     //cleanedIngredient = ingredient.replace(irrelevantWordsRegex, '').replace(/\s\s+/g, ' ').trim();
    
    return {
        name: cleanedIngredient,
        quantity: '',
        unit: ''
    };
}

function cleanTitle(title) {
    // Remove parts of the title that are not part of the actual title
    title = title.replace(/:.*$/, '');
    // Remove everything between ¿! and ¿?
    title = title.replace(/¿[^?]*\?/g, '');
    title = title.replace(/¡[^?]*\!/g, '');
    return title.trim(); // Trim to remove any leading or trailing whitespace
}

export async function searchRecipesAndTranslate(ingredients) {
    try {
        //console.log(ingredients)
        // Traducir ingredientes al inglés antes de buscar recetas
        const translatedIngredients = await translateIngredients(ingredients, 'ES','EN');
        
        //console.log(translatedIngredients)

        // Buscar recetas con los ingredientes traducidos
        const recipes = await APIsearchRecipesByIngredients(translatedIngredients);

        // Traducir los campos necesarios de las recetas al español
        const translatedRecipes = await Promise.all(recipes.map(async recipe => {
            const translatedTitle = await translateText(recipe.title, 'EN','ES');
            const translatedInstructions = recipe.instructions ? await translateText(recipe.instructions, 'EN', 'ES'): '';
            const translatedIngredients = await Promise.all(
                recipe.ingredients.map(ingredient => translateText(ingredient, 'EN','ES'))
            );
            const translatedCuisine = recipe.cuisineType ? await translateText(recipe.cuisineType,'EN', 'ES') : '';
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
            cuisine: recipe.cuisineType || '',
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