const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        
        jwt.verify(authHeader,"secret",(err,user)=>{
            if(err) res.status(403).json("Token is not valid");
           
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated");
    }
};

module.exports = verifyToken;