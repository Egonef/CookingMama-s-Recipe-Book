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
      expect(response.session.user).toHaveProperty('email','user1@gmail.com')
      expect(testSession.user).toHaveProperty('password','1234')
    
    });
  },10000);


  describe('register', () =>{

    //firstName, secondName, userName, email, password, isAdmin
      it('Should register if the user is new', async () =>{
        const response = await testSession.post("/api/users/register").send({
          firstName:'nuevoUsuarioRegistrado',
          secondName:'ApellidoNuevoUsuarioRegistrado',
          userName:'user4',
          password:'1234',
          isAdmin: true,
          email: 'user4@gmail.com'})

        expect(response.statusCode).toBe(201)
      })


      
      it('Shouldnt register if the user has the same email as other user', async () =>{
       
          const response = await testSession.post("/api/users/register").send({
            firstName:'nuevoUsuarioRegistrado',
            secondName:'ApellidoNuevoUsuarioRegistrado',
            userName:'user4',
            password:'1234',
            isAdmin: true,
            email: 'user1@gmail.com'})
  
          expect(response.statusCode).toBe(409)
      })

  })


  describe('status', ()=>{

    var authenticatedSession;
    
    beforeEach(function (done) {

      testSession.post("/api/users/login").send({ email: 'user1@gmail.com', password : '1234'})
        .expect(201)
        .end(function (err) {
          if (err) return done(err);
          authenticatedSession = testSession;
          return done();
      });
    });
    
    it('Should return true if the user is logged in', async () =>{

      const response = await authenticatedSession.get("/api/users/status")
      //console.log(response)
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('loggedIn',True)
      expect(response.body).toHaveProperty('user')
    })

    it('Should return false if the user is not logged in', async () =>{
      const response = await testSession.get("/api/users/status")
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('loggedIn',False)
    })
  })