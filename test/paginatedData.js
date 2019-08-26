/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import base from './base';

const LOGIN_URL = '/api/v1/auth/signin';
const SIGNUP_URL = '/api/v1/auth/signup';

const image = './helpers/unsplash.jpg';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('CREATE AN ADVERT ', () => {
  it('should return 201 on success', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(201);
            resp.body.should.be.a('object');
            resp.body.should.have.property('data');
            done();
          });
      });
  });
  
  
  it('should return 200 on successful retrieval', (done) => {
    chai.request(app)
      .get('/api/v1/property/paginate/1')
      .end((error, resp) => {
        if (error) done();
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        done();
      });
  });
});
