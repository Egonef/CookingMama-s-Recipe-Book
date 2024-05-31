import request from "supertest";
import app from "../app";

describe('Performance Tests', () => {
  it('should measure the response time for getting popular recipes', async () => {
    const startTime = Date.now();
    const response = await request(app).get("/api/recipes/popular");
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(200);  // Ajusta este valor según tus necesidades
  });

  it('should measure the response time for getting a recipe by ID', async () => {
    const startTime = Date.now();
    const response = await request(app).get("/api/recipes/0000000116b91f66fbb3fd6c");
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime} ms`);

    expect(response.statusCode).toBe(200);
    expect(responseTime).toBeLessThan(200);  // Ajusta este valor según tus necesidades
  });
});
