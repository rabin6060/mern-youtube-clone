import User from "../model/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

export const signup = async(req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({...req.body,password:hashPassword})
        await newUser.save()
        res.status(200).send('user created susseccfull')
    }catch(err){
        next(err)
    }
}
export const signin = async (req,res,next) => {
    try{
        const user =await User.findOne({name:req.body.name})
        if(!user) return next(createError(404,'user not found'))
        const isCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(!isCorrect) return next(createError(404,"password incorrect"))
        const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
        const {password,...others} = user._doc
        res.cookie('access_token',token)
        .status(200)
        .json(others)
    }catch(err){
        next(err)
    }
}
export const googleAuth = async (req,res,next)=>{
    const user =await User.findOne({email:req.body.email})
    try{
        if(user){
            const token =  jwt.sign({id:user._id},process.env.SECRET_KEY)
            res.cookie('access_token',token)
            .status(200)
            .json(user._doc)
        }else{
            const newUser = new User({...req.body,fromGoogle:true})
            const savedUser = await newUser.save()
            const token = jwt.sign({id:savedUser._id},process.env.SECRET_KEY)
            res.cookie('access_token',token)
            .status(200)
            .json(savedUser._doc)
    
        }
    }catch(err){
        next(err)
    }
}