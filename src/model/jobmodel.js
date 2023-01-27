const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    skills :{
        type:String,

    },
    experience :{
        type:Number,
        default:0-1
    } ,
    userId:{
        type:ObjectId,
        ref:"Login"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 

module.exports = mongoose.model("Job",jobSchema)