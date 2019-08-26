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

describe('DELETE AN ADVERT', () => {
  it('should raise 202 when an advert is deleted', (done) => {
    chai.request(app)
      .post(SIGNUP_URL) // create user
      .send(base.signup_user_10)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property') // user creates an account
          .set('x-access-token', res.body.data.token)
          .field(base.advert_4)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            chai.request(app)
              .post(LOGIN_URL) // login admin
              .send(base.login_user_10)
              .end((errors, response) => {
                if (errors) done();
                chai.request(app)
                  .delete(`/api/v1/property/${resp.body.data.id}`)
                  .set('x-access-token', response.body.data.token)
                  .end((errors2, response2) => {
                    if (errors2) done();
                    response2.should.have.status(202);
                    response2.body.should.be.a('object');
                    response2.body.should.have.property('data');
                    done();
                  });
              });
          });
      });
  });

  it('should raise 404 when advert doesnt exist', (done) => {
    chai.request(app)
      .post(LOGIN_URL) // create user
      .send(base.login_user_10)
      .end((errors, res) => {
        if (errors) done();
        chai.request(app)
          .delete('/api/v1/property/10000')
          .set('x-access-token', res.body.data.token)
          .end((errors2, response) => {
            if (errors2) done();
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            done();
          });
      });
  });
});
