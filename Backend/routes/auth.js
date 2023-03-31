const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fetchUser=require('../middleware/fetchUser');
const JWT_Sec = 'Mady$1E+6'
const jwt = require('jsonwebtoken');

router.post('/createuser',
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    body('mail').isEmail()

    , async (req, res) => {
        let success=false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success:success, error: "please enter valid details"})
        }
        //check whether same user exist
        try {
            let user = await User.findOne({ mail: req.body.mail });
            if (user) {
                return res.status(400).json({ success:success, error: "Sorry a user with this email already exist" })
            }
            //encrypting password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //if no such user exist create one
            user = await User.create({
                name: req.body.name,
                // password:req.body.password,
                password: secPass,
                mail: req.body.mail
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_Sec);
            success=true;
            res.json({success,authToken});
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({success:success, error:"Some error occured"});
        }
    })

// creating a login endpoint
router.post('/login',
    body('password').isLength({ min: 6 }),
    body('mail').isEmail(),
    async (req, res) => {
        let success=false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ success:success, error:" Invalid credentials"})
        }
        const { password, mail } = req.body;
        try {
            const user = await User.findOne({ mail })
            if (!user) {
                return res.status(404).json({ success:success, error: "No user found" })
            }
            const compPass = await bcrypt.compare(password, user.password);
            if (!compPass) {
                return res.status(500).json({ success:success, error: "Please enter valid user credentials" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = await jwt.sign(data, JWT_Sec);
            success=true;
            res.json({success,authToken});
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send({success:success, error:"Internal server error"});
        }
    })

// creating a route to fetch logged in user details
router.post('/getuser',
    fetchUser,
    async (req, res) => {
        let success=false;
        const { password, mail } = req.body;
        try {
            userId=req.user.id;
            const user=await User.findById(userId).select('-password');
            success=true;
            res.send({success,user});
        } catch (error) {
            res.status(400).send({error:"Please authenticate using a valid token"})
        }
    })

module.exports = router;