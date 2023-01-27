
const mongoose = require('mongoose')

const isValid = function(value){
    if(typeof value == "undefined" || value == null){return false}
    if(typeof value == "string" && value.trim().length ==0){return false}
    return true
}


const isValidName = function(value){
    if (/^[A-Za-z\s]{1,35}$/.test(value)) return true;
    return false;  
} 

const isvalidPhone = function (mobile) {
    if (/^(\+91[\-\s]?)?[0]?[6789]\d{9}$/.test(mobile)) return true;
    return false;
  };


const isValidEmail = function (email) {
    if (/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(email)) {
      return true;
    }
    return false;
  };
  
  
  const isValidPassword = function (pass) {
  if (/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass)) return true;
    return false;
  };

const isValidNumber = function(value){
  if(typeof value === Number && value.trim().length === 0) return false
  if (value > 100 || value < 0) return false;

  return true
}

const validImage = function(image){
return /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/.test(image)
}

const isvalidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};


module.exports = {isValid, isValidName ,validImage, isvalidPhone ,isValidEmail , isValidPassword,isvalidObjectId ,isValidNumber}