const mongoose = require('mongoose');



const likesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require
    },
    foor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        require:true
    }
    },{
        timestamps:true
    
    })

const likesModel = mongoose.model('likes', likesSchema);
module.exports = likesModel;  