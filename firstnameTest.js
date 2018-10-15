let mongoose = require("mongoose");
let user1 = require('./model/model');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();
var expect = chai.expect;



describe('/GET/:firstname', () => {
    it('it should GET a book by the given id', (done) => {
        const user = {
          
                firstname: "naveen",
                // surname: "s",
                // mobile: 9739301366,
                // email: "shreenivas.s@accionlabs.com",
                // dob: "6201996",
                // password: "naveensss2",
                // emp_id: 24589,
                // gender: "male"
       

        }
        
            chai.request('localhost:4101/user')

          .get('/' + user.firstname)
          .send(user)
          .end((err, res) => {
            res.should.have.property('status', 200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('firstname');
                // res.body.should.have.property('surname');
                // res.body.should.have.property('email');
                // res.body.should.have.property('dob');
                // res.body.should.have.property('firstname').eql(user.firstname);
                expect(res.body).to.deep.equal({ firstname});
            done();
          });
        });

    });



