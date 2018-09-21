const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = mongoose.Schema({    
    firstname: String,
    surname: String,
    mobile: {type:Number, unique:true},
    email: {type:String,unique:true},
    dob:Date,
    password: {type:String, trim: true, require: true},
    emp_id: Number,
    gender: String 
});

UserSchema.pre('save', (next)=>{
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const Users = mongoose.model('user', UserSchema);
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = {
    userModel: Users,
    UserSchema: UserSchema
}