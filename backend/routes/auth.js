const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Nikhilisagoodboy';
const saltRounds = 10;

const router = express.Router(); 

//Route 1 : create a user using : POST "/api/auth/createuser"  . No login required.
router.post('/createuser',
[body('name').isLength({min: 3}),body('email').isEmail(),body('password').isLength({min: 5})],
async(req,res)=>{
    
    //If there are errors return bad request and the errors.
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()});
    }
    
    try{
        //check wheather the user with this email exists already.
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry the user with this email already exists."})
        }

        const securePass = await bcrypt.hash(req.body.password, saltRounds); 
        //create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        // res.json(user);
        res.json({token: authToken});
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }        
})

//Route 2 : Authenticate the user using POST "/api/auth/login". No login required
router.post('/login',
[body('email').isEmail(),body('password').exists()],
async(req,res)=>{
    
    //If there are errors return bad request and the errors.
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()});
    }
    //destructuring of req.body
    const {email,password} = req.body;
    try{
        //check wheather the user with this email exists already.
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials."})
        }

        const passCompare = await bcrypt.compare(password, user.password); 
        
        if(!passCompare){
            return res.status(400).json({error: "Please try to login with correct credentials."})
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data,JWT_SECRET);
        // res.json(user);
        res.json({token: authToken});
    }catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
        
})

//Route 3 : Get in logged in user details POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

module.exports = router;