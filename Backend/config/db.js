import mongoose from 'mongoose'
import { databaseFunctions } from '../scriptsmongodb/updateDatabase.js'; // Ajusta la ruta según tu estructura de proyecto


// URL de conexión a tu base de datos en MongoDB Atlas
//const uri = 'mongodb+srv://i12gaava:ProjectCookingMama@cookingmama.ja3p6r6.mongodb.net/?retryWrites=true&w=majority&appName=CookingMama';
/**const uri = "mongodb+srv://i12gaava:ProjectCookingMama@cookingmama.ja3p6r6.mongodb.net/?retryWrites=true&w=majority&appName=CookingMama";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    }
  }
  export default connectDB

// Conectar a la base de datos
const connectDB = async () => {
    const con = await mongoose.connect(uri)
    .then(() => console.log('Conexión establecida con MongoDB Atlas'))
    .catch(error => console.error('Error al conectar con MongoDB Atlas:', error));
}

export default connectDB
*/


const connectDB = async () => {
    try {
        //database Name
        const databaseName='CookingMama';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`).then(console.log("Se ha inciado conexión base de datos"))
        await databaseFunctions();
        console.log('Database synchronization complete.');
        return con;
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}


export default connectDB
