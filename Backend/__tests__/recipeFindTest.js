// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"
import {idRecetaDefault1, RecetaDefault1}  from "../testSetup"
import mongoose from 'mongoose';

// Test cases for getRecipeById function
describe('getRecipes', () => {
  it('should return the recipe if found', async () => {
    const response = await request(app).get("/api/recipes/popular");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0)
  
  });
 
},10000);

describe('getRecipesByID', () => {

  it('should return the recipe if found', async () => {
    //console.log("idRecetaDefault en test:"+ idRecetaDefault1);
    //console.log("RecetaDefault1._id en test" + RecetaDefault1._id)
    const response = await request(app).get("/api/recipes/id/" + "0000000116b91f66fbb3fd6c");
    expect(response.statusCode).toBe(200);
    //expect(response.body).toBe(recetaDefault1.toJSON())
  });

  it('should return error when not found', async () => {
    const response = await request(app).get("/api/recipes/id/" +  "662a29c87649ab8290495d08");
    expect(response.statusCode).toBe(404);
  });
 
},10000);

describe('getRecipesByIngredient', () => {
  it('should return the recipe if found', async () => {

    const response = await request(app).get("/api/recipes/ingredient/pollo");
    expect(response.statusCode).toBe(200);
    expect(response.body)

    expect(Array.isArray(response.body)).toBe(true);

    // Check if at least one recipe contains 'tomato' as an ingredient
    const recipesWithTomato = response.body.filter(recipe => {
      return recipe.ingredients.some(ingredient => ingredient.name.toLowerCase() === 'pollo');
    });
  
    // At least one recipe should have 'tomato' as an ingredient
    expect(recipesWithTomato.length).toBeGreaterThan(0);
  
  
  });

  it('should return nothing when not found', async () => {
    const response = await request(app).get("/api/recipes/ingredients/patata");
    expect(response.statusCode).toBe(404);
  });

  //Deberia diferneciarse en que no hay plato con esa receta y que ese ingrediente no exoista
 
},10000);





