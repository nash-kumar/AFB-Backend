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
                firstname: "shreenivas",
                surname: "s",
                mobile: 9739301366,
                email: "shreenivas.s@accionlabs.com",
                dob: "6201996",
                password: "naveensss2",
                emp_id: 24589,
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
