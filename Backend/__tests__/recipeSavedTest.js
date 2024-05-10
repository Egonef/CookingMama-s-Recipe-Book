// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"


describe('getRecipesSavedByUser', ()=> {
  
  it("Should return the recipes if the user and the recipes exist", async ()=>{

    const response = await request(app).get("/api/recipes/saved")
                                        .query({userEmail:'palolo@gmail.com'})
  expect(request.statusCode).toBe(200)                                      
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBe(1);
  
  });
    
  
  it("Should return error if the user doesnt exist", async()=>{
    const response = await request(app).get("/api/recipes/saved")
                                        .query({userEmail:'nouser@gmail.com'})
    expect(request.statusCode).toBe(401)                                      
                         
  });
},10000)

describe('setRecipesSavedByUser', ()=> {
  it("Should return error if the user not found", async ()=>{
    const response = await request(app).post("/api/recipes/saved");
    
    
  });
    
  it("Should return error if the recipe is not found", async()=>{
    const response = await request(app).get("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });
  it("Should return error if the recipe is already saved", async()=>{
    const response = await request(app).get("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });

  it("Should return good when all is correct", async()=>{
    const response = await request(app).get("/api/recipes/saved");
    expect(response.statusCode).toBe(200);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].id).toBe("")
    
  });
},10000);


describe('setRecipesSavedByUser', ()=> {
  it("Should return error if the user not found", async ()=>{
    const response = await request(app).post("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que tenga el numero correcto de recetas
    expect(response.body)
  });
    
  it("Should return error if the recipe is not found", async()=>{
    const response = await request(app).delete("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });
  it("Should return error if the recipe is already saved", async()=>{
    const response = await request(app).delete("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });

  it("Should return good when all is correct", async()=>{
    const response = await request(app).delete("/api/recipes/saved");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  },10000);

  
})

