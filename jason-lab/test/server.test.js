'use-strict';

const app = require('../server');
const request = require('supertest')(app);

describe('Express Infrastructure', function(){
  describe('without valid auth', function(){
    it ('should return 401', function(){
      return request.get('/404').expect(401);
    });
    it ('should return 401', function(){
      return request
        .get('/404')
        .set('Authorization', 'Basic')
        .expect(401);
    });
  });
  describe('with valid auth', function(){
    it ('should return 404', function(){
      return request
        .get('/404')
        .auth('user', 'password')
        .expect(404);
    });
    it ('should have CORS headers', function(){
      return request.get('/')
        .expect('Access-Control-Allow-Origin', '*');
    });
  });
});
