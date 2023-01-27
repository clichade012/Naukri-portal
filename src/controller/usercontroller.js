let usermodel = require('../model/usermodel')
const jobmodel = require('../model/jobmodel')
const { uploadFile } = require('../Aws/aws')
const { isValid, isValidName, isValidEmail, validImage, isvalidObjectId } = require('../validation/validator')

const userapplyingjob = async function (req, res) {
   try {
      let data = req.body
      let JobId = req.params.JobId
      let file = req.files
      let file2 = req.files
      let { name, email } = data

      if (Object.keys(data).length == 0) {
         return res.status(400).send({ status: false, message: "Body can't be Empty!" })
      }

      let jobpost = await jobmodel.findOne({ _id: JobId })
      if (!jobpost) {
         return res.status(400).send({ status: false, message: "This JobId does n't exist!" })
      }


      let jobIdexist = await usermodel.findOne({ JobId: JobId, email: email })
      if (jobIdexist) {
         return res.status(409).send({ status: false, message: "you have already filled the application!" })
      }
      else {
         if (!JobId) {
            return res
               .status(400)
               .send({ status: false, message: "please enter JobID" });
         }
         if (!isvalidObjectId(JobId)) {
            return res.status(400).send({ status: false, message: 'This ObjectId is not valid!' })
         }
         data.JobId = JobId
      }

      if (!name) {
         return res.status(400).send({ status: false, message: "Name is required!" })
      }

      if (!isValid(name)) {
         return res.status(400).send({ status: false, message: "Name is invalid!" })
      }

      if (!isValidName(name)) {
         return res.status(400).send({ status: false, message: "Name should n't contain  any extraa charcter!" })
      }

      if (!email) {
         return res.status(400).send({ status: false, message: "Email is required!" })
      }

      if (!isValid(email)) {
         return res.status(400).send({ status: false, message: "Email is invalid!" })
      }

      if (!isValidEmail(email)) {
         return res.status(400).send({ status: false, message: "Please use correct character email!" })
      }

      if (file.length == 0) return res.status(400).send({ status: false, message: "Resume field is Mandatory" });

      if (file && file.length > 0) {
         let uploadImage = await uploadFile(file[0]);
         data.resume = uploadImage
         if (!validImage(data.resume)) return res.status(400).send({ status: false, message: "Invalid format of image" })
      }

      if (file2.length == 0) return res.status(400).send({ status: false, message: "Coverletter field is Mandatory" });


      if (file2 && file2.length > 0) {
         let uploadImage = await uploadFile(file2[0]);
         data.coverletter = uploadImage
         if (!validImage(data.coverletter)) return res.status(400).send({ status: false, message: "Invalid format of image" })
      }

      let create = await usermodel.create(data)

      return res.status(201).send({ status: true, message: "User successfully applied for this job", data: create })

   } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
   }
}

const getbyparams = async function (req, res) {
   try {
      let userId = req.params.userId

      if (!userId) {
         return res.status(400).send({ status: false, message: "userId is required!" })
      }

      if (!isValid(userId)) {
         return res.status(400).send({ status: false, message: "userId is invalid!" })
      }

      if (!isvalidObjectId(userId)) {
         return res.status(400).send({ status: false, message: 'This userId have some missing character!' })
      }



      let get = await usermodel.find({ _id: userId })
      if (!get) {
         return res.status(404).send({ status: false, message: `This ${userId} not founded!` })
      }

      return res.status(200).send({ status: true, message: "Applied for this job", data: get })


   } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
   }

}

const updateuser = async function (req, res) {
   try {
      let data = req.body
      let files = req.files
      let files2 = req.files
      let userId = req.params.userId
      let { resume, coverletter } = files
      let { name, email, JobId } = data

      let update = {}


      if (!userId) {
         return res.status(400).send({ status: false, message: "userId is required" })
      }

      let exist = await usermodel.findOne({ _id: userId, isDeleted: false })
      if (!exist) {
         return res.status(404).send({ status: false, message: `this ${userId} does n't exist!` })
      }

      if (name) {
         if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is invalid!" })
         }

         if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "Name should n't contain  any extraa charcter!" })
         }
         update.name = name
      }

      if (email) {
         if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is invalid!" })
         }

         if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please use correct character email!" })
         }
         update.email = email
      }

      if (resume) {
         if (file && file.length > 0) {
            let uploadImage = await uploadFile(file[0]);
            data.resume = uploadImage
            if (!validImage(resume)) return res.status(400).send({ status: false, message: "Invalid format of image" })
         }
         update.resume = resume
      }

      if (coverletter) {
         if (file2 && file2.length > 0) {
            let uploadImage = await uploadFile(file2[0]);
            data.coverletter = uploadImage
            if (!validImage(coverletter)) return res.status(400).send({ status: false, message: "Invalid format of image" })
         }
         update.coverletter = coverletter
      }

      if (JobId) {
         if (!isvalidObjectId(JobId)) {
            return res.status(400).send({ status: false, message: 'This ObjectId is not valid!' })
         }
         update.JobId = JobId
      }



      let updateuser = await usermodel.findOneAndUpdate({ _id: userId }, { $set: update }, { new: true })

      return res.status(200).send({ status: true, message: "User Update succesfully!", data: updateuser })


   } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
   }

}

let deleteuser = async function (req, res) {
   try {
      let userId = req.params.userId

      if (!userId) {
         return res.status(400).send({ status: false, message: "userId is required" })
      }

      let exist = await usermodel.findOne({ _id: userId, isDeleted: false })
      if (!exist) {
         return res.status(404).send({ status: false, message: `this ${userId} does n't exist!` })
      }

      let deleteu = await usermodel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true })

      return res.status(200).send({ status: true, message: "Successfully deleted user!", data: deleteu })


   } catch (error) {
      return res.status(500).send({ status: false, message: error.message })
   }
}

module.exports = { userapplyingjob, getbyparams, updateuser, deleteuser }