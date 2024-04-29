// Import the necessary modules and functions for testing
const { getRecipeById } = require( "../controllers/recipeController");
import  Recipe from"../models/recipesModel";
import mongoose from "mongoose";


// Mock the necessary dependencies (e.g., req, res) using Jest
//jest.mock('../models/recipesModel');

// Mock req and res objects
let req;
let res;

const mockRecipe1 = new Recipe({
  "id": "1",
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
      "quantity": "",
      "unit": ""
    }
  ],
  "steps": "Precalienta el horno a 180°C. Corta las verduras y colócalas en una bandeja con el pollo. Hornea durante 45 minutos.",
  "image": "https://www.bing.com/images/search?view=detailV2&ccid=B0odvtU6&id=0C04476577AB023732580CDAB067ABDECF369B42&thid=OIP.B0odvtU6vJ5v5ShPpfrDpAHaE8&mediaurl=https%3a%2f%2fwww.saluddiez.com%2fwp-content%2fuploads%2f2020%2f06%2ffried-meat-on-white-plate-2338407-1170x780.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.074a1dbed53abc9e6fe5284fa5fac3a4%3frik%3dQps2z96rZ7DaDA%26pid%3dImgRaw%26r%3d0&exph=780&expw=1170&q=pollo+al+horno&simid=608001691478999317&FORM=IRPRST&ck=16E5F4CC0D1FE6F89C481739D8D05755&selectedIndex=1&itb=0",
  "maxReadyTime": 60,
  "intolerances": ""
})

beforeAll(async () =>{
        const databaseTestName='CookingMamaTest';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseTestName}`);
})
beforeEach(() => {
 
  
});

// Test cases for getRecipeById function
describe('getRecipeById', () => {
  it('should return the recipe if found', async () => {

    // Mock the return value of Recipe.findById
    await mockRecipe1.save()
    
   //Rellenar base de datos
    const req = {
      params: "1"
    }
    const res = { 
      status: jest.fn().mockReturnThis(),
      send: jest.fn() 
    };
    // Call the getRecipeById function
    await getRecipeById(req, res);

    // Assert that res.json is called with the correct recipe
    expect(Recipe.find).toBeCalledWith('1');
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith(mockRecipe1);
  });

  it('should return 404 with error message if recipe is not found', async () => {
    // Mock Recipe.findById to return null (recipe not found)
    Recipe.findById.mockResolvedValueOnce(null);

    // Call the getRecipeById function
    await getRecipeById(req, res);

    // Assert that res.status and res.json are called correctly
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Recipe not found' });
  });

  it('should throw an error if Recipe.findById throws an error', async () => {
    // Mock Recipe.findById to throw an error
    const error = new Error('Database error');
    Recipe.findById.mockRejectedValueOnce(error);

    // Call the getRecipeById function
    await expect(getRecipeById(req, res)).rejects.toThrow(error);
  });
});
