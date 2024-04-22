import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    secondName:{
        type: String,
    },
<<<<<<< HEAD
    username: {
=======
    userName: {
>>>>>>> b829fd7a16961964305fa4414660e4fd609ebea1
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
<<<<<<< HEAD
        default: false
    },
    favoriteRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    ownRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
=======
        defualt: false
    },
>>>>>>> b829fd7a16961964305fa4414660e4fd609ebea1
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
