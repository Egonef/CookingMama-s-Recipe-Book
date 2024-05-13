// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"

describe("getRecipesCreatedByUser", ()=>{
  //TODO terminar test
  it("Should return good ",async ()=>{
    const response = await request(app).get("/api/recipes/myOwn").query({userID:"1"});
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });

  it("Should return error if the user doesnt exist ",async()=>{
    const response = await request(app).get("/api/recipes/myOwn");
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });
},10000);


