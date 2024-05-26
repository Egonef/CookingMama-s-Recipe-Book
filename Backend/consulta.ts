const axios = require('axios');
const { MongoClient } = require('mongodb');

async function fetchDataAndInsertIntoMongoDB() {
    try {
        // Obtener datos de la API
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=25');
        const data = response.data;

        // Conectar a MongoDB
        const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
        await client.connect();
        const db = client.db('CookingMama');
        const collection = db.collection('Recipe');

        // Insertar datos en MongoDB
        await collection.insertMany(data);

        console.log('Datos insertados en MongoDB correctamente.');

        // Cerrar la conexión
        await client.close();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

// Llamar a la función para ejecutar el proceso
fetchDataAndInsertIntoMongoDB();
