const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({    
    firstname: String,
    surname: String,
    mobile: {type:Number, unique:true, required: true},
    email: {type:String, unique:true, required: true},
    dob: Number,
    password: String,
    emp_id: Number,
    gender: String 
});

const Users = mongoose.model('user', UserSchema);
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = {
    userModel: Users,
    UserSchema: UserSchema
}