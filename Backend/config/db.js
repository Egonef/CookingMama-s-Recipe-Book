import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='CookingMama';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`).then(console.log("Se ha inciado conexión base de datos"))
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB
