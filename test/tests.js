var assert = require('assert');
const Auth = require('../routes/auth')
const index= require('../index')
const User = require('../models/user')
const {response} = require("express");
const {request} = require("express");
let chai = require('chai')
const expect = chai.expect;

chai.should();
chai.use(require("chai-http"));


describe('API test: ',()=>{
    it('should not let you go to dashboard when giving no token', (done) => {
        chai.request("http://localhost:8002")
            .get('/api/dashboard')
            .end( function(err,res){
                chai.expect(res).to.have.status(401);
                done();
            });
    });
    it('should not let you go to dashboard when giving wrong token', (done) => {
        chai.request("http://localhost:8002")
            .get('/api/dashboard')
            .set('authorization', '8281938')
            .end( function(err,res){
                chai.expect(res).to.have.status(400);
                done();
            });
    });
    it('should not let you login when giving wrong password', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/login')
            .send({ "email": "prueba5@prueba.com", "password":"123123" })
            .end( function(err,res){
                chai.expect(res).to.have.status(400);
                done();
            });
    });
    it('should let you login when giving correct password', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/login')
            .send({ "email": "prueba5@prueba.com", "password":"1231234" })
            .end( function(err,res){
                chai.expect(res).to.have.status(200);
                done();
            });
    });
    it('should not let you login when giving wrong username', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/login')
            .send({ "email": "prueqweba5@prueba.com", "password":"1231234" })
            .end( function(err,res){
                chai.expect(res).to.have.status(400);
                done();
            });
    });
    it('should not let you register when existing email', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/register')
            .send({"name":"prueba5", "email":"prueba5@prueba.com", "password": "123123"})
            .end( function(err,res){
                chai.expect(res).to.have.status(400);
                done();
            });
    });
    it('should not let you register when giving short inputs', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/register')
            .send({"name":"rueba5", "email":"p@p.c", "password": "12312"})
            .end( function(err,res){
                chai.expect(res).to.have.status(400);
                done();
            });
    });
});

