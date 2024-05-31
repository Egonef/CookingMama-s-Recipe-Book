import fs from 'fs';

// Leer los archivos de recetas e ingredientes
const recipes = JSON.parse(fs.readFileSync('recipes.json'));
const ingredients = JSON.parse(fs.readFileSync('ingredients.json'));

// Función para verificar si un ingrediente existe en la lista de ingredientes
function ingredientExists(ingredientName) {
    return ingredients.some(ingredient => ingredient.name === ingredientName);
}

// Recorrer cada receta
recipes.forEach(recipe => {
    // Recorrer cada ingrediente de la receta
    recipe.ingredients.forEach(ingredient => {
        // Verificar si el ingrediente no existe en la lista de ingredientes
        if (!ingredientExists(ingredient.name)) {
            // Añadir el ingrediente a la lista de ingredientes
            ingredients.push({ name: ingredient.name });
            console.log(`Ingrediente '${ingredient.name}' añadido a ingredients.json`);
        }
    });
});

// Escribir la lista actualizada de ingredientes en el archivo ingredients.json
fs.writeFileSync('ingredients.json', JSON.stringify(ingredients, null, 2));
console.log('Archivo ingredients.json actualizado.');
