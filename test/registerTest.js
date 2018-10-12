let mongoose = require("mongoose");
let user1 = require('./model/model');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should;
var expect = chai.expect;


describe('/POST user1', () => {
    it('status 200 should be passed ', (done) => {
        
        const user1 = {
            data: {
                firstname: "naveen",
                surname: "s",
                mobile: 91234565679,
                email: "naveen.sss@accionlabs.com",
                dob: "6201996",
                password: "naveensss",
                emp_id: 24587,
                gender: "male"
            }

        }
        chai.request('localhost:4101/user')
            .post('/register')
            .send(user1)
            .end((err, res) => {
                expect(res).to.have.status(201);

            });
    }).timeout(50000);
});

describe('/POST user1', () => {
    it('status be 500', (done) => {
        const user1 = {
            data: {
                firstname: "naveen",
                surname: "s",
                mobile: 91234565679,
                email: "naveen.sss@accionlabs.com",
                dob: "6201996",
                password: "naveensss",
                emp_id: 24587,
                gender: "male"
            }

        }
        chai.request('localhost:4101/user')
            .post('/register')
            .send(user1)
            .end((err, res) => {
                expect(res).to.have.status(500);
            
                done();
            });
    }).timeout(50000);
});
