const mongoose = require('mongoose')

const LginSchema = new mongoose.Schema({
     name:{
        type:String,
        require:true
     },
     mobile:{
        type:Number,
        require:true
     },
     email:{
        type:String,
        require:true,
        unique:true
     },
     password:{
        type:String,
        require:true
     }

},{
    timestamps:true
})

module.exports = mongoose.model("Login",LginSchema)