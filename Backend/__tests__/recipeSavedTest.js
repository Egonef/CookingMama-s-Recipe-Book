// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"


describe('getRecipesSavedByUser', ()=> {
  
  it("Should return the recipes if the user and the recipes exist", async ()=>{

    const response = await request(app).get("/api/recipes/test/saved")
                                        .query({userID: "000000087852431f2bf8ae17"})
  expect(response.statusCode).toBe(200)                                      
  
 
  });
    
  
  it("Should return error if the user doesnt exist", async()=>{
    const response = await request(app).get("/api/recipes/test/saved")
                                        .query({userID:"662a29c87649ab8290495d08"})
    expect(response.statusCode).toBe(404)
                    
  });
},10000)



describe('setRecipeSavedByUser', ()=> {
  it("Should return error if the user not found", async ()=>{
    const response = await request(app).post("/api/recipes/test/saved").query({userID : "662a29c87649ab8290495d08",
                                                                          recipeID: "0000000116b91f66fbb3fd6c"});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Usuario no encontrado')
  });
    
  it("Should return error if the recipe is not found", async()=>{

    const response = await request(app).post("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "662a29c87649ab8290495d08"});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta no encontrada')
  });

  it("Should return error if the recipe is already saved", async()=>{

    const response = await request(app).post("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "0000000116b91f66fbb3fd6c"});
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message','Receta ya salvada por usuario')
  });

  it("Should return good when all is correct", async()=>{

    const response = await request(app).post("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "00000002ce8a2ad7cfaddf90"});
    expect(response.statusCode).toBe(200);
  });

},10000);


describe('setRecipeUnSavedByUser', ()=> {
  

  it("Should return error if the user not found", async ()=>{
    const response = await request(app).delete("/api/recipes/test/saved").query({userID : "662a29c87649ab8290495d08",
                                                                          recipeID: "0000000116b91f66fbb3fd6c"});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Usuario no encontrado')
  });
    


  it("Should return error if the recipe is not found", async()=>{
    
    const response = await request(app).delete("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "662a29c87649ab8290495d08"});
    expect(response.statusCode).toBe(404)
    expect(response.body).toHaveProperty('message','Receta no encontrada')
  });


  it("Should return error if the recipe is not saved", async()=>{

    const response = await request(app).delete("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "00000003ce8a2ad7cfaddf90"});
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('message','Receta no salvada por el usuario')
  });


  it("Should return good when all is correct", async()=>{

    const response = await request(app).delete("/api/recipes/test/saved").query({userID : "000000087852431f2bf8ae17",
                                                                          recipeID: "0000000116b91f66fbb3fd6c"});
    expect(response.statusCode).toBe(200);

    
    
  });
  
})

