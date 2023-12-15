import jwt from "jsonwebtoken";
import {createError} from "./error.js"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token
    if(!token) return next(createError(401,'user not authenticated.'))
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return next(createError(403,'token not valid'))
        req.user = user
        next()
    })
}