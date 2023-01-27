const express = require('express')

const router = express.Router()

const { createL, login } = require('../controller/Lgincontroller')

const { createjob, getbyQuery, updatejobpost, deletejobpost } = require('../controller/jobcontroller')

const { userapplyingjob, getbyparams, updateuser, deleteuser } = require('../controller/usercontroller')

let { authenication, authorisation } = require('../middleware/auth')

/*------------loginApi's----------------------*/
router.post('/create', createL)

router.post('/login', login)

/*------------JOb Api's----------------------*/
router.post('/create/:userId', authenication, createjob)

router.get('/Query', authenication, getbyQuery)

router.put('/update/:jobId/:userId', authenication, authorisation, updatejobpost)

router.delete('/delete/:jobId/:userId', authenication, authorisation, deletejobpost)

/*----------------user Api's--------------*/

router.post('/applyforjob/:JobId', authenication, authorisation, userapplyingjob)

router.get('/getalluser/:userId', authenication, getbyparams)

router.put('/updateuser/:userId', authenication, authorisation, updateuser)

router.delete('/deleteuser/:userId', authenication, authorisation, deleteuser)

router.all("/**", function (req, res) {
  res.status(400).send({
    status: false,
    msg: "The api you are requesting is not available",
  });
});

module.exports = router;