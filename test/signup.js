/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import base from './base';

const SIGNUP_URL = '/api/v1/auth/signup';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('POST', () => {
  it('should signup a user', (done) => {
    chai
      .request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_1)
      .end((err, res) => {
        if (err) done();
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should raise an error if email or password is missing', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_2)
      .end((err, res) => {
        if (err) done();
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should raise an error when email is invalid', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_3)
      .end((err, res) => {
        if (err) done();
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error').eql('Invalid email format ');
        done();
      });
  });

  it('should raise an error when password is invalid', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_4)
      .end((err, res) => {
        if (err) done();
        const error = 'Weak password, must be at least 8 characters and have at least 1 letter and number';
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error').eql(error);
        done();
      });
  });

  it('should raise an error if firstName has special characters', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_5)
      .end((err, res) => {
        if (err) done();
        const error = 'Names should not contain special characters';
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error').eql(error);
        done();
      });
  });

  it('should raise an error if lastName has special characters', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_6)
      .end((err, res) => {
        if (err) done();
        const error = 'Names should not contain special characters';
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error').eql(error);
        done();
      });
  });
  it('should raise an error if an invalid phoneNummmber is sbmitted', (done) => {
    chai.request(app)
      .post(SIGNUP_URL)
      .send(base.signup_user_7)
      .end((err, res) => {
        if (err) done();
        const error = 'Please enter a valid phone number with country code';
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error').eql(error);
        done();
      });
  });
});
