let jwt = require('jsonwebtoken')
const lginmodel = require('../model/Lginmodel')
let {isvalidObjectId } = require('../validation/validator')

const authenication = async function(req,res,next){
    try{
            let token = req.headers["x-api-key"]
            if(!token){
                return res.status(400).send({status:false , message:"Token must be present!"})
            }

            jwt.verify(token , "SecretkeyofNaukri",function(err,decodedtoken){
                if(err){
                    return res.status(400).send({status:false , message:"Token is invalid!"})
                }else{
                    req.token = decodedtoken.userId
                    next()
                }
            })
    }
    catch(error){
        return res.status(500).send({status:false , message:error.message})
    }
}

const authorisation = async function(req,res,next){
    try{
       let userId = req.params.userId

       if(!userId){
        return res.status(400).send({status:false , message:"userId must be present!"})
       }

       if(!isvalidObjectId(userId)){
        return res.status(400).send({status:false , message:"userId must be valid !objectId!"})
       }

       let exist = await lginmodel.findOne({_id:userId})
       if(!exist){
        return res.status(404).send({status:false , message:"This id does n't exist!"})
       }

       if(exist._id != req.token){
        return res.status(403).send({ status: false, message: "Sorry! Unauthorized User" })
       }

        next()
       

    }catch(error){
        return res.status(500).send({status:false , message:error.message})
    }
}

module.exports = {authenication,authorisation}