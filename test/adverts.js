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
      .send(base.signup_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_1)
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
  it('should raise 400 if empty field is not provided', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(base.login_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field({})
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(400);
            resp.body.should.be.a('object');
            resp.body.should.have.property('status');
            resp.body.should.have.property('error');
            done();
          });
      });
  });
  it('should raise 400 on an invalid price', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(base.login_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_2)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(400);
            resp.body.should.be.a('object');
            resp.body.should.have.property('status');
            resp.body.should.have.property('error')
              .eql('Please enter a valid property price');
            done();
          });
      });
  });
  it('should return 200 on successful retrieval', (done) => {
    chai.request(app)
      .get('/api/v1/property')
      .end((error, resp) => {
        if (error) done();
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        done();
      });
  });

  it('should return 200 on successful return of an advert', (done) => {
    chai.request(app)
      .get('/api/v1/property/1')
      .end((error, resp) => {
        if (error) done();
        resp.should.have.status(200);
        resp.body.should.be.a('object');
        resp.body.should.have.property('data');
        done();
      });
  });
  it('should raise 400 on an invalid status', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(base.login_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_7)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(400);
            resp.body.should.be.a('object');
            resp.body.should.have.property('status');
            done();
          });
      });
  });
  it('should raise 400 on an invalid state', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(base.login_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/property')
          .set('x-access-token', res.body.data.token)
          .field(base.advert_8)
          .attach('photo', image)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(400);
            resp.body.should.be.a('object');
            resp.body.should.have.property('status');
            resp.body.should.have.property('error');
            done();
          });
      });
  });

  it('should return 200 on successful return of a user adverts', (done) => {
    chai.request(app)
      .post(LOGIN_URL)
      .send(base.login_user_8)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .get('/api/v1/user/adverts')
          .set('x-access-token', res.body.data.token)
          .end((error, resp) => {
            if (error) done();
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            resp.body.should.have.property('status');
            resp.body.should.have.property('data');
            done();
          });
      });
  });
});
