const express = require('express')
// const actions = require('../methods/actions')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('hello Wworld')
})

router.get('/dashboard',(req,res)=>{
    res.send('Dashboard')
})

//@desc Adding new user
//@router POST /adduser
router.post('/adduser',actions.addNew)

//@desc Authenticate user
//@router POST /authenticate
router.post('/authenticate',actions.authenticate)

//@desc Get info on a user
//@router GET /getinfo
router.get('/getinfo', actions.getinfo)

module.exports = router