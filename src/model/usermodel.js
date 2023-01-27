const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    resume:{
        type:String,
        require:true
    },
    coverletter:{
        type:String,
        require:true
    },
    JobId:{
        type:ObjectId,
        ref:"Job"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

module.exports = mongoose.model("user",userSchema)