const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async(req,res)=>{

    const {username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.findOne({username});
    if(user){
        return res.status(400).json({message:"Username already exists"});
    }

    const newUser = new User({username, password: hashedPassword});

    await newUser.save();

    res.json({message:"User registered successfully"});
})

router.post("/login", async(req,res)=>{

    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message:"Username does not exist"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
     
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({id: user._id},"secret");

    res.json({token, userId: user._id});
})

module.exports = router;