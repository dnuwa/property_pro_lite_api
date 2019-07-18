/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import base from './base';

const LOGIN_URL = '/api/v1/auth/signin';
const SIGNUP_URL = '/api/v1/auth/signup';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('GET SAME TYPE ADVERTS ', () => {
  it('should return 201 on success', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_9)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .send(base.advert_3)
          .end((error, resp) => {
            if (error) done();
            chai.request(app)
              .get('/api/v1/property/type/residential')
              .end((er, response) => {
                if (er) done();
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('data');
                done();
              });
          });
      });
  });
  it('should return 404 if no advert found', (done) => {
    chai.request(app)
      .get('/api/v1/property/type/bombadia')
      .end((error, resp) => {
        if (error) done();
        resp.should.have.status(404);
        resp.body.should.be.a('object');
        resp.body.should.have.property('error');
        done();
      });
  });
});
