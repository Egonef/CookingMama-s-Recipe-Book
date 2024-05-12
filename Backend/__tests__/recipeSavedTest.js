// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"


describe('getRecipesSavedByUser', ()=> {
  
  it("Should return the recipes if the user and the recipes exist", async ()=>{

    const response = await request(app).get("/api/recipes/saved")
                                        .query({userEmail:'user1@gmail.com'})
  expect(response.statusCode).toBe(200)                                      
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBe(1);
  //TODO: COmprobar el cuerpo
  });
    
  
  it("Should return error if the user doesnt exist", async()=>{
    const response = await request(app).get("/api/recipes/saved")
                                        .query({userEmail:'nouser@gmail.com'})
    expect(request.statusCode).toBe(401)
    //TODO                 
  });
},10000)



describe('setRecipeSavedByUser', ()=> {
  it("Should return error if the user not found", async ()=>{
    const response = await request(app).post("/api/recipes/saved").query({userID : 999,
                                                                          recipeID: 1});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Usuario no encontrado')
  });
    
  it("Should return error if the recipe is not found", async()=>{

    const response = await request(app).post("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 999});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta no encontrada')
  });

  it("Should return error if the recipe is already saved", async()=>{

    const response = await request(app).post("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 1});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta ya salvada por usuario')
  });

  it("Should return good when all is correct", async()=>{

    const response = await request(app).post("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 2});
    expect(response.statusCode).toBe(200);
  });

},10000);


describe('setRecipeUnSavedByUser', ()=> {
  

  it("Should return error if the user not found", async ()=>{
    const response = await request(app).delete("/api/recipes/saved").query({userID : 999,
                                                                          recipeID: 1});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Usuario no encontrado')
  });
    


  it("Should return error if the recipe is not found", async()=>{
    
    const response = await request(app).delete("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 999});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta no encontrada')
  });


  it("Should return error if the recipe is not saved", async()=>{

    const response = await request(app).post("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 999});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta no salvada por usuario')
  });


  it("Should return good when all is correct", async()=>{

    const response = await request(app).post("/api/recipes/saved").query({userID : 1,
                                                                          recipeID: 1});
    expect(response.statusCode).toBe(200);

    
    
  });
  
})

