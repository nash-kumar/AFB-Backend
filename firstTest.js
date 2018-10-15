
process.env.NODE_ENV = 'test';


let mongoose = require("mongoose");
let user = require('./model/model');



var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = require('should');
var expect = chai.expect;


chai.use(chaiHttp);

describe('/GET user list', () => {
    it('it should respond with 200 status code', (done) => {
        chai.request('localhost:4101/user')
            .get('/list')
            .end((err, res) => {
                
               res.should.have.property('status', 200);
                done();
            });
    });
});

describe('/GET user list', () => {
    it('it should GET all the users as a single JSON', (done) => {
        chai.request('localhost:4101/user')
            .get('/list')
            .end((err, res) => {
                // expect(res).to.have.status(200);
                expect(res).to.be.json;
                //  res.should.be.equal(200);
               // res.should.have.property('status', 200);
                //   res.should.have.status(200);
                //res.body.should.be.a('array');

                done();
            });
    });
});

describe('/GET user list', () => {
    it('it should respond with specific key-values', (done) => {
        chai.request('localhost:4101/user')
            .get('/list')
            .end((err, res) => {
                expect(obj).to.have.nested.property('sucess.message.user.data.firstname');
                // expect(res).to.have.param('vinay');
                // expect(res).to.have.status(200);
                //expect(res).to.be.json;
                //  res.should.be.equal(200);
               // res.should.have.property('status', 200);
                //   res.should.have.status(200);
                //res.body.should.be.a('array');

                done();
            });
    });
});