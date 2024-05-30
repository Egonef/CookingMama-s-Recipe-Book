import request  from "supertest";
import app from "../app"
import session from "supertest-session";


var testSession = null;

beforeEach(function () {
  testSession = session(app);
})

describe('login', () => {
    
    it('shouldnt let you login when the password doesnt match', async () => {
      const response = await testSession.post("/api/users/login").send({ email: 'user1@gmail.com', password : 'wrongPassword'})

      expect(response.statusCode).toBe(406);
    
    });
    it('shouldnt let you login when the user doesnt exist', async () => {
      const response = await testSession.post("/api/users/login").send({ email: 'nouser@gmail.com', password : 'wrongPassword'})
      expect(response.statusCode).toBe(405);
    
    });
   
    it('should let you login ', async () => {
      const response = await testSession.post("/api/users/login").send({ email: 'user1@gmail.com', password : '1234'})
      expect(response.statusCode).toBe(201);
      
    
    });
  },10000);
