const mongoose= require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    }
})
const User=mongoose.model('UserSchema',UserSchema)
module.exports=User
  