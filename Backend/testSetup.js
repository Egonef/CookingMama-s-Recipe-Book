// Import the necessary modules and functions for testing
const { getRecipeById } = require( "./controllers/recipeController");
import  Recipe from"./models/recipesModel";
import mongoose from "mongoose";
import User from "./models/usersModel";


let idRecetaDefault1 = null;
let idRecetaDefault2 = null;
let idUsuario1 = null;


beforeAll(async () =>{
  const databaseTestName='CookingMamaTest';
  const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseTestName}`);
  await Recipe.deleteMany({})
  await User.deleteMany({})
  recetaDefault1 = await recetaDefault1.save();
  idRecetaDefault1 = recetaDefault1._id
  recetaDefault2 = await recetaDefault2.save();
  idRecetaDefault2 = recetaDefault2._id
  usuarioConRecetaGuardada = await usuarioConRecetaGuardada.save();
  idUsuario1 = usuarioConRecetaGuardada._id
  console.log("IDs al final del beforeAll:" + idRecetaDefault1 + "," + idRecetaDefault2 + ","+ idUsuario1);
})
afterAll(async () =>{
await Recipe.deleteMany();
await User.deleteMany({})
mongoose.connection.close();

})
beforeEach(async () => {

//await Recipe.deleteMany();

});


var recetaDefault1 = new Recipe({
  "title": "Pollo al horno con verduras",
  "cuisine": "Mediterránea",
  "ingredients": [
    {
      "name": "Pollo",
      "quantity": "500",
      "unit": "gramos"
    },
    {
      "name": "Verduras variadas",
      "quantity": "500",
      "unit": "gramos"
    },
    {
      "name": "Sal",
      "quantity": "al gusto",
      
    }
  ],
  "steps": "Precalienta el horno a 180°C. Corta las verduras y colócalas en una bandeja con el pollo. Hornea durante 45 minutos.",
  "image": "https://www.bing.com/images/search?view=detailV2&ccid=B0odvtU6&id=0C04476577AB023732580CDAB067ABDECF369B42&thid=OIP.B0odvtU6vJ5v5ShPpfrDpAHaE8&mediaurl=https%3a%2f%2fwww.saluddiez.com%2fwp-content%2fuploads%2f2020%2f06%2ffried-meat-on-white-plate-2338407-1170x780.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.074a1dbed53abc9e6fe5284fa5fac3a4%3frik%3dQps2z96rZ7DaDA%26pid%3dImgRaw%26r%3d0&exph=780&expw=1170&q=pollo+al+horno&simid=608001691478999317&FORM=IRPRST&ck=16E5F4CC0D1FE6F89C481739D8D05755&selectedIndex=1&itb=0",
  "maxReadyTime": 60,
  "intolerances": ""
})
var recetaDefault2 = new Recipe({
  "title": "Ensalada Griega",
  "cuisine": "Mediterránea",
  "ingredients": [
    {
      "name": "Tomate",
      "quantity": "2",
      "unit": "unidades"
    },
    {
      "name": "Pepino",
      "quantity": "1",
      "unit": "unidad"
    },
    {
      "name": "Cebolla roja",
      "quantity": "1/2",
      "unit": "unidad"
    },
    {
      "name": "Aceitunas negras",
      "quantity": "100",
      "unit": "gramos"
    },
    {
      "name": "Queso feta",
      "quantity": "100",
      "unit": "gramos"
    },
    {
      "name": "Aceite de oliva",
      "quantity": "2",
      "unit": "cucharadas"
    },
    {
      "name": "Zumo de limón",
      "quantity": "1",
      "unit": "cucharada"
    },
    {
      "name": "Orégano",
      "quantity": "1/2",
      "unit": "cucharada"
    },
    {
      "name": "Sal",
      "quantity": "al gusto",
      "unit": ""
    },
    {
      "name": "Pimienta",
      "quantity": "al gusto",
      "unit": ""
    }
  ],
  "steps": "Corta los tomates, pepinos y cebolla. Mezcla con las aceitunas y el queso feta. Aliña con aceite de oliva, zumo de limón, orégano, sal y pimienta. Mezcla bien y sirve.",
  "image": "https://nutricionvitae.com/wp-content/uploads/2021/03/ensalada-griega.jpg",
  "maxReadyTime": 20,
  "intolerances": "",
  "popularity": 0
})

var usuarioConRecetaGuardada = new User({
  "firstName":"UserName",
  "secondName": "User2Name",
  "userName":"user1",
  "email":"user1@gmail.com",
  "password":"1234",
  "isAdmin": false,
  "favouriteRecipes":[1]
})

export default {idRecetaDefault1, idRecetaDefault2, idUsuario1}
  




