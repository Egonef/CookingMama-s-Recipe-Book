import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique:true
    },
    title: {
        type: String,
        required: true,
        unique:true
    },
    cuisine:{
        type: String,
        required:true
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        unit: {
            type: String
        }
    }],
    steps: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
        unique:true
    },
    maxReadyTime: {
        type: Number,
        required: true
    },
    intolerances: {
        type: String,
    }, // Lista de alergenos asociados al ingrediente (opcional)
    popularity: {
        type: Number,
    }
}, {
    timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema,"Recipe")

export default Recipe

