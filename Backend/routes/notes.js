const express=require('express')
const router=express.Router();
const fetchUser=require('../middleware/fetchUser');
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');


// router to add notes
router.post('/addnote',fetchUser,
body('title').isLength({min:3}),
body('description').isLength({min:5}),
async(req,res)=>{
try {
    const {title,description,comments}=req.body;
    const error = validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({ error: error.array })
}

    const note= new Notes({title,description,comments,user:req.user.id});
    const savednote=await note.save();
    res.json(savednote);
} catch (error) {
    return res.status(500).json({ error: error.array })
}
})

// router ti fetch notes
router.get('/fetchnotes',fetchUser,async(req,res)=>{
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);
})


// route to update note
router.put('/updatenote/:id',fetchUser, async(req,res)=>{
    try{

        const{ title,description,comments}=req.body;
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(comments){newNote.comments=comments}
        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("notes not found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("invalid request")
        }
    
        note=await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.send({note})
    }
    catch(error){
        return res.status(500).json({ error: error.array })
        }
})


// router to delete note
router.delete('/deletenote/:id',fetchUser, async (req,res)=>{
    try{

        let note= await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("notes not found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("invalid request")
        }
        note=await Notes.findByIdAndDelete(req.params.id);
        res.send({note});
    }
    catch(error){
    return res.status(500).json({ error: error.array })
    }

})
module.exports=router;