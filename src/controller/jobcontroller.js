const { response } = require('express')
const jobmodel = require('../model/jobmodel')
const { findOne } = require('../model/Lginmodel')
const { isValid, isValidEmail, isValidNumber } = require('../validation/validator')

const createjob = async function (req, res) {
    try {

        let userId = req.params.userId
        let data = req.body

        let { title, description, email, skills, experience } = data

        if (!title) {
            return res.status(400).send({ status: false, Message: "Title is required!" })
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, Message: "Please put correct details for title!" })
        }


        if (!description) {
            return res.status(400).send({ status: false, Message: "description is required!" })
        }

        if (!isValid(description)) {
            return res.status(400).send({ status: false, Message: "Please put correct details for description!" })
        }

        if (!email) {
            return res.status(400).send({ status: false, Message: "description is required!" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, Message: "Please put correct details for email!" })
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, Message: "Please use correct character email!" })
        }

        if (!skills) {
            return res.status(400).send({ status: false, Message: "Title is required!" })
        }

        if (!isValid(skills)) {
            return res.status(400).send({ status: false, Message: "Please put correct details for skills!" })
        }

        if (!experience) {
            return res.status(400).send({ status: false, Message: "Experience is required!" })
        }

        if (!isValid(experience)) {
            return res.status(400).send({ status: false, Message: "Please put correct details for Experience!" })
        }

        if (!isValidNumber(experience)) {
            return res.status(400).send({ status: false, Message: "Please use valid number for Experience!" })
        }

        let checkpost = await jobmodel.findOne({
            email: email,
            title: title,
            description: description,
            skills: skills,
            experience: experience
        })

        if (checkpost) {
            return res.status(409).send({ status: true, message: "This Post already exists!!" })
        } else {
            data['userId'] = userId
        }

        let create = await jobmodel.create(data)

        return res.status(201).send({ status: true, message: "Successfully created post", data: create })



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getbyQuery = async function (req, res) {
    try {
        let data = req.query

        let { skills, experience } = data

        let filter = {}

        if (Object.keys(data).length == 0) {
            let getall = await jobmodel.find()
            if (!getall) {
                return res.status(404).send({ status: false, message: "No data found!" })
            }
            return res.status(200).send({ status: true, message: "Data found", data: getall })
        }

        if (skills) {
            filter.skills = { $regex: skills, $options: 'i' }
        }

        if (experience) {
            filter.experience = experience
        }

        let getq = await jobmodel.find({ isDeleted: false, ...filter })
        if (!getq) {
            return res.status(404).send({ status: false, message: "No data found!" })
        }
        return res.status(200).send({ status: true, message: "Data found", data: getq })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updatejobpost = async function (req, res) {
    try {
        let data = {}

        let { title, description, email, skills, experience } = req.body

        let jobId = req.params.jobId

        let check = await jobmodel.findOne({ _id: jobId, isDeleted: false })
        if (!check) {
            return res.status(404).send({ status: false, message: "This job post does n't exist!" })
        }

        if (!(title || description || email || skills || experience)) {
            return res.status(400).send({ status: false, message: "This feild are only required [title ,description , email ,skills, experience]!" })
        }

        if (title) {
            if (!isValid(title)) {
                return res.status(400).send({ status: false, message: "Please put correct details for title!" })
            }
            data.title = title
        }

        if (description) {
            if (!isValid(description)) {
                return res.status(400).send({ status: false, message: "Please put correct details for description!" })
            }
            data.description = description
        }

        if (email) {
            if (!isValid(email)) {
                return res.status(400).send({ status: false, message: "Please put correct details for email!" })
            }

            if (!isValidEmail(email)) {
                return res.status(400).send({ status: false, Message: "Please use correct character email!" })
            }
            data.email = email
        }

        if (skills) {
            if (!isValid(skills)) {
                return res.status(400).send({ status: false, message: "Please put correct details for skills!" })
            }
            data.skills = skills
        }

        if (experience) {
            if (!isValid(experience)) {
                return res.status(400).send({ status: false, message: "Please put correct details for skills!" })
            }


            if (!isValidNumber(experience)) {
                return res.status(400).send({ status: false, Message: "Please use valid number for Experience!" })
            }

            data.experience = experience
        }


        let update = await jobmodel.findOneAndUpdate({ _id: jobId }, { $set: { ...data } }, { new: true })

        return res.status(200).send({ status: true, message: "JobPost is updated", data: update })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deletejobpost = async function (req, res) {
    try {
        let jobId = req.params.jobId

        if (!jobId) {
            return res.status(404).send({ status: false, message: "JobId is required" })
        }

        const exist = await jobmodel.findOne({ _id: jobId, isDeleted: false })
        if (!exist) {
            return res.status(400).send({ status: false, message: "This id does n't exist!" })
        }

        let deletepost = await jobmodel.findOneAndUpdate({ _id: jobId }, { $set: { isDeleted: true } }, { new: true })

        return res.status(200).send({ status: true, message: "Post deleted successfully", data: deletepost })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createjob, getbyQuery, updatejobpost, deletejobpost }