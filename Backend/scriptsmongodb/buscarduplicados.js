import fs from 'fs';

// Lee el contenido de ingredients.json
fs.readFile('ingredients.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  try {
    // Parsea el contenido JSON a un objeto JavaScript
    const ingredients = JSON.parse(data);

    // Crea un objeto para almacenar los ingredientes y contar su frecuencia
    const ingredientCounts = {};

    // Itera sobre los ingredientes y cuenta su frecuencia
    ingredients.forEach(ingredient => {
      const name = ingredient.name.toLowerCase(); // Considera el nombre del ingrediente en minúsculas para evitar duplicados por diferencia de mayúsculas y minúsculas
      ingredientCounts[name] = (ingredientCounts[name] || 0) + 1;
    });

    // Encuentra los ingredientes duplicados
    const duplicates = Object.entries(ingredientCounts)
      .filter(([name, count]) => count > 1)
      .map(([name, count]) => name);

    if (duplicates.length > 0) {
      console.log('Ingredientes duplicados encontrados:');
      duplicates.forEach(duplicate => {
        console.log(duplicate);
      });
    } else {
      console.log('No se encontraron ingredientes duplicados.');
    }
  } catch (parseError) {
    console.error('Error al parsear el contenido JSON:', parseError);
  }
});
