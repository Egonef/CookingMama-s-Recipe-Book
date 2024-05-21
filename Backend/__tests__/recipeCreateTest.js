// Import the necessary modules and functions for testing
import request  from "supertest";
import app from "../app"

describe("getRecipesCreatedByUser", ()=>{
  //TODO terminar test
  it("Should return good ",async ()=>{
    const response = await request(app).get("/api/recipes/myOwn").query({userID:"000000087852431f2bf8ae17"});
    expect(response.statusCode).toBe(200);
    //Comprobar que devuelve condigo de error correcto
    
  });

  it("Should return error if the user doesnt exist ",async()=>{
    const response = await request(app).get("/api/recipes/myOwn").query({userID:"662a29c87649ab8290495d08"});
    expect(response.statusCode).toBe(404);
    //Comprobar que devuelve condigo de error correcto
    expect(response.body)
  });
},10000);


