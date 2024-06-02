import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import Recipe from '../models/recipesModel.js'
import { actualizarIngredientes } from '../controllers/recipeController.js';
import Ingredient from '../models/ingredientsModel.js'


const recetas = JSON.parse(fs.readFileSync('./scriptsmongodb/recipes.json'));
const ingredientes = JSON.parse(fs.readFileSync('./scriptsmongodb/ingredients.json'));

function compareIngredients(ingredientsFromFile, ingredientsFromDB) {
    if (ingredientsFromFile.length !== ingredientsFromDB.length) {
        return false;
    }

    for (let i = 0; i < ingredientsFromFile.length; i++) {
        const ingredientFromFile = ingredientsFromFile[i];
        const ingredientFromDB = ingredientsFromDB[i];

        if (ingredientFromFile.name !== ingredientFromDB.name ||
            ingredientFromFile.quantity !== ingredientFromDB.quantity ||
            ingredientFromFile.unit !== ingredientFromDB.unit) {
            return false;
        }
    }
}

async function synchronizeRecipes() {
    try {
      for (const recipeFromFile of recetas) {
        const { id } = recipeFromFile;
        const recipeFromDB = await Recipe.findOne({ id });
  
        if (recipeFromDB) {
          // If recipe exists in DB, check if it needs updating
          const fieldsToUpdate = {};
          let needsUpdate = false;
  
          /**for (const key in recipeFromFile) {
            console.log(key)
            if (key !== 'popularity') {
                if (!deepEqualIgnoreId(recipeFromFile[key], recipeFromDB[key])) {
                    console.log(recipeFromFile[key])
                    console.log(recipeFromDB[key])
                    fieldsToUpdate[key] = recipeFromFile[key];
                    needsUpdate = true;
                }
            }
          }**/
          // Compare each field explicitly
          if (recipeFromFile.title !== recipeFromDB.title) {
            fieldsToUpdate.title = recipeFromFile.title;
            needsUpdate = true;
        }
        if (recipeFromFile.cuisine !== recipeFromDB.cuisine) {
            fieldsToUpdate.cuisine = recipeFromFile.cuisine;
            needsUpdate = true;
        }
        if (!compareIngredients(recipeFromFile.ingredients, recipeFromDB.ingredients)) {
            
            //console.log(recipeFromFile.ingredients)
            //console.log(recipeFromDB.ingredients)
            fieldsToUpdate.ingredients = recipeFromFile.ingredients;
            needsUpdate = true;
        }
        if (recipeFromFile.steps !== recipeFromDB.steps) {
            fieldsToUpdate.steps = recipeFromFile.steps;
            needsUpdate = true;
        }
        if (recipeFromFile.image !== recipeFromDB.image) {
            fieldsToUpdate.image = recipeFromFile.image;
            needsUpdate = true;
        }
        if (recipeFromFile.maxReadyTime !== recipeFromDB.maxReadyTime) {
            fieldsToUpdate.maxReadyTime = recipeFromFile.maxReadyTime;
            needsUpdate = true;
        }
        if (recipeFromFile.intolerances !== recipeFromDB.intolerances) {
            fieldsToUpdate.intolerances = recipeFromFile.intolerances;
            needsUpdate = true;
        }
        
        //console.log(fieldsToUpdate)
          if (needsUpdate) {
            await Recipe.updateOne({ id }, { $set: fieldsToUpdate });
            //console.log(`Updated recipe with id: ${id}`);
          } else {
            //console.log(`No changes for recipe with id: ${id}`);
          }
        } else {
          // If recipe does not exist in DB, add it
          const newRecipe = new Recipe(recipeFromFile);
          await newRecipe.save();
          await actualizarIngredientes(newRecipe);
          console.log(`Added new recipe with id: ${id}`);
        }
      }
      console.log('Recipe synchronization complete');
    } catch (error) {
      console.error('Error synchronizing recipes:', error);
    }
  }


// Function to synchronize ingredients
async function synchronizeIngredients() {
    try {
        for (const ingredientFromFile of ingredientes) {
            const { name } = ingredientFromFile;
            const ingredientFromDB = await Ingredient.findOne({ name });

            if (!ingredientFromDB) {
                // If ingredient does not exist in DB, add it
                const newIngredient = new Ingredient(ingredientFromFile);
                await newIngredient.save();
                console.log(`Added new ingredient: ${name}`);
            }
        }
        console.log('Ingredient synchronization complete');
    } catch (error) {
        console.error('Error synchronizing ingredients:', error);
    }
}

// Función para verificar si un ingrediente existe en la lista de ingredientes
function ingredientExists(ingredientName) {
    return ingredientes.some(ingredient => ingredient.name === ingredientName);
}

// Función para verificar si hay nuevos ingredientes
function hayNuevosIngredientes() {
    let nuevosIngredientes = false;
    // Recorrer cada receta
    recetas.forEach(recipe => {
        // Recorrer cada ingrediente de la receta
        recipe.ingredients.forEach(ingredient => {
            // Verificar si el ingrediente no existe en la lista de ingredientes
            if (!ingredientExists(ingredient.name)) {
                nuevosIngredientes = true;
                return;
            }
        });
    });
    return nuevosIngredientes;
}

function createIngredients(){
    // Recorrer cada receta
    recetas.forEach(recipe => {
        // Recorrer cada ingrediente de la receta
        recipe.ingredients.forEach(ingredient => {
            // Verificar si el ingrediente no existe en la lista de ingredientes
            if (!ingredientExists(ingredient.name)) {
                // Añadir el ingrediente a la lista de ingredientes
                ingredientes.push({ name: ingredient.name });
                console.log(`Ingrediente '${ingredient.name}' añadido a ingredients.json`);
            }
        });
    });

    // Escribir la lista actualizada de ingredientes en el archivo ingredients.json
    fs.writeFileSync('ingredients.json', JSON.stringify(ingredientes, null, 2));
}


export async function databaseFunctions() {
  // Call the function to synchronize recipes
  if (hayNuevosIngredientes()) {
    createIngredients();
}  
    await synchronizeIngredients();
    await synchronizeRecipes();
}