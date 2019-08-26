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

describe('UPDATE AN ADVERT', () => {
  it('should raise 200 when an advert is updated', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_12)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_6)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            chai.request(app)
              .post(LOGIN_URL)
              .send({ email: 'ras@gmail.com', password: 'somestring1' })
              .end((errors, response) => {
                if (errors) done();
                chai.request(app)
                  .patch(`/api/v1/property/${resp.body.data.id}/sold`)
                  .set('x-access-token', response.body.data.token)
                  .send({ newStatus: 'SOLD' })
                  .end((errors2, response2) => {
                    if (errors2) done();
                    response2.should.have.status(200);
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
      .post(LOGIN_URL)
      .send({ email: 'ras@gmail.com', password: 'somestring1' })
      .end((errors, res) => {
        if (errors) done();
        chai.request(app)
          .patch('/api/v1/property/10000/sold')
          .set('x-access-token', res.body.data.token)
          .send({ newStatus: 'SOLD' })
          .end((errors2, response) => {
            if (errors2) done();
            response.should.have.status(404);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            done();
          });
      });
  });

  it('should raise 400 when the new status is not SOLD', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send({ email: 'ras@gmail.com', password: 'somestring1' })
      .end((errors, res) => {
        if (errors) done();
        chai.request(app)
          .patch('/api/v1/property/1/sold')
          .set('x-access-token', res.body.data.token)
          .send({ newStatus: 'someString' })
          .end((errors2, response) => {
            if (errors2) done();
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('error');
            done();
          });
      });
  });
});
