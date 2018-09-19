var mongoose = require('mongoose');

var UserSchema=mongoose.Schema(
    {
        firstname:{type:String ,required:true},
        surname:{ type:String ,required:true},
        mobile:{ type:Number ,required:true},
        email:{ type:String ,required:true},
        dob:{ type:String ,required:true},
        password:{ type:String ,required:true},
        gender:{ type:String ,required:true},
    }
);

module.exports =mongoose.model('user',UserSchema);