const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')
const multer = require('multer')
const app = express()

app.use(express.json())

mongoose.set('strictQuery',true)

mongoose.connect("mongodb+srv://Chaitanya012:uEEYLDPlUa999wEK@cluster0.0zsen34.mongodb.net/Naukri-com?retryWrites=true&w=majority",
  {  useNewUrlParser:true
}) 
.then(()=> console.log("Mongodb is connected"))
.catch( err => console.log(err))

app.use(multer().any())

app.use('/',route)

app.listen( 3000 , function(){
    console.log('Express app running on port '+ (3000));
})




