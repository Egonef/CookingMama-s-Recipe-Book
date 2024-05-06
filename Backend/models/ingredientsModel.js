import mongoose from 'mongoose';

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        // required: true  comprobar que la receta contenga una cantidad
    },
    unit: {
        type: String
    },
    recipeIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema, "Ingredient");

export default Ingredient;
