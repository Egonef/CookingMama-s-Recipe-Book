import request from "supertest";
import app from "../app";

describe('Performance Tests of Recipes', () => {
  it('should measure the response time for getting popular recipes', async () => {
    const startTime = Date.now();
    const response = await request(app).get("/api/recipes/popular");
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(200); 
  });

  it('should measure the response time for getting a recipe by ID', async () => {
    const startTime = Date.now();
    const response = await request(app).get("/api/recipes/0000000116b91f66fbb3fd6c");
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(200); 
  });
});
/*
describe('Performance Test for getRecipeByIngredientAndFilter', () => {
  it('should measure the response time with APIEnabled=True', async () => {
    const ingredients = "Pollo";
    const cuisine = "Mediterránea";
    const maxReadyTime = 60;
    const APIEnabled = 'True';

    const startTime = Date.now();
    const response = await request(app)
      .get(`/api/recipes/find`)
      .query({ ingredients, cuisine, maxReadyTime, api: APIEnabled });
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    console.log(`Response time with APIEnabled=True: ${responseTime} ms`);

    // Asegúrate de que la prueba espera un código de estado correcto según tu lógica
    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(5000);  // Ajusta este valor según tus necesidades de rendimiento
  });

  it('should measure the response time with APIEnabled=False', async () => {
    const ingredients = "Pollo";
    const cuisine = "Mediterránea";
    const maxReadyTime = 60;
    const APIEnabled = 'False';

    const startTime = Date.now();
    const response = await request(app)
      .get(`/api/recipes/find`)
      .query({ ingredients, cuisine, maxReadyTime, api: APIEnabled });
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    console.log(`Response time with APIEnabled=False: ${responseTime} ms`);

    // Asegúrate de que la prueba espera un código de estado correcto según tu lógica
    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(2000);  // Ajusta este valor según tus necesidades de rendimiento
  });
});
*/
describe('Performance Tests of Login and Register', () => {
  it('should measure the response time for user login', async () => {
    const startTime = Date.now();
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "user1@gmail.com", password: "1234" });
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Login response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(201); // Assuming 201 is the status code for successful login
    expect(responseTime).toBeLessThan(200); 
  });

  it('should measure the response time for user registration', async () => {
    const startTime = Date.now();
    const response = await request(app)
      .post("/api/users/register")
      .send({ 
        firstName: "John",
        secondName: "Doe",
        userName: "johndoe",
        email: "test@example.com",
        password: "password123",
      });
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Registration response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(201); // Assuming 201 is the status code for successful registration
    expect(responseTime).toBeLessThan(200); 
  });
});
