const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({    
    name: String,
    designation: String,
    place: String,
    salary: Number,
    phoneno: Number 
});
const Users = mongoose.model('user', UserSchema);
UserSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = {
    userModel: Users,
    UserSchema: UserSchema
}