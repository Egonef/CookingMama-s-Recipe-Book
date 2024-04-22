import mongoose from 'mongoose';

const ingredientSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    unit: String, // Por ejemplo, gramos, litros, tazas, etc.
    
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
