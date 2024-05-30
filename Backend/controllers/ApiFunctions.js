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
            console.warn(`API Key ${apiKeyTranslation} has reached its limit.`);
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
    '320b591ffc074aa3bb69573f63430599',
    '00570bddee654466ad4874540ef1b7bc' //email:b.o.a.ns.o.re@gmail.com psswd:CookingMama
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