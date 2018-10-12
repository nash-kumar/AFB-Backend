let mongoose = require("mongoose");
let user1 = require('./model/model');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should;
var expect = chai.expect;

describe('/Post Login' ,() =>{
 it('should pass when given the right details',(done)=>{
     const user1 ={
        data:{user:{
             email:"naveen.s@accionlabs.com",
             password:"naveens"
          }}}
          chai.request('localhost:4101/user')
          .post('/login')
          .send(user1)
          .end((err, res) => {
              expect(res).to.have.status(200);
              done();
 })
})
})

describe('/Post Login' ,() =>{
    it('should fail when email is wrong',(done)=>{
        const user1 ={
           data:{user:{
               email:"naveen.s@accionlabs.com",
                password:"navee"
             }}}
             chai.request('localhost:4101/user')
             .post('/login')
             .send(user1)
             .end((err, res) => {
                 expect(res).to.have.status(200);
                 done();
    })
   })
   })

   describe('/Post Login' ,() =>{
    it('should fail when email and password is wrong',(done)=>{
        const user1 ={
           data:{user:{
               email:"naveen.aa@accionlabs.com",
                password:"naveenuuioo"
             }}}
             chai.request('localhost:4101/user')
             .post('/login')
             .send(user1)
             .end((err, res) => {
                 expect(res).to.have.status(200);
                 done();
    })
   })
   })

   describe('/Post Login' ,() =>{
    it('should fail when password is wrong',(done)=>{
        const user1 ={
           data:{user:{
               email:"naveen.s@accionlabs.com",
                password:"navee"
             }}}
             chai.request('localhost:4101/user')
             .post('/login')
             .send(user1)
             .end((err, res) => {
                 expect(res).to.have.status(200);
                 done();
    })
   })
   })

  
   describe('/Post Login' ,() =>{
    it('should fail when empty',(done)=>{
        const user1 ={
           data:{user:{
               email:"",
                password:""
             }}}
             chai.request('localhost:4101/user')
             .post('/login')
             .send(user1)
             .end((err, res) => {
                 expect(res).to.be.undefined;
                 done();
     })
    })
   })