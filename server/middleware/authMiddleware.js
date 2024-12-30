const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const protect = async(req,res,next)=> {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if(req.user.role !== 'admin'){
                res.status(401);
                throw new Error('Not authorized as an admin');
            }

            next();
        } catch (error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

module.exports = protect;