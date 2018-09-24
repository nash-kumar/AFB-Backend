const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt=require('bcrypt');
const saltRounds=10;
const UserSchema = mongoose.Schema({    
    firstname: String,
    surname: String,
    mobile: {type:Number, unique:true},
    email: {type:String,unique:true},
    dob:String,
    password: String,
    emp_id: Number,
    gender: String 
});
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });
    module.exports = mongoose.model('User', UserSchema);
const Users = mongoose.model('user', UserSchema);
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = {
    userModel: Users,
    UserSchema: UserSchema
}