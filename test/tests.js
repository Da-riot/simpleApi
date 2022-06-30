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

    it('should not let you register when existing email', (done) => {
        chai.request("http://localhost:8002")
            .post('/api/user/register')
            .send({"name":"prueba5", "email":`${process.env.EMAILTEST}`, "password": "RANDOMPASSWORD"})
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

