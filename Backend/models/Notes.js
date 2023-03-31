const mongoose= require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    comments:{
        type:String,
    }
})
module.exports=mongoose.model('NotesSchema',NotesSchema)
  