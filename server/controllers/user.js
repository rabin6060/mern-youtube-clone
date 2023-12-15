import { createError } from "../error.js"
import User from "../model/User.js"
import Video from "../model/Video.js"
export const update =async (req,res,next) => {
    if(req.params.id===req.user.id){
        try{
            const updateUser =await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updateUser)
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403,"you can only update your account content"))
    }
}
export const deleteUser =async (req,res,next) => {
    if(req.params.id===req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted')
        }catch(err){
            next(err)
        }
    }else{
        return next(createError(403,"you can only update your account content"))
    }
}
export const getUser =async (req,res,next) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}
export const subscribe =async (req,res,next) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1},
        })
        res.status(200).json("subscription successfull")
    }catch(err){
        next(err)
    }
}
export const unsubscribe =async (req,res,next) => {
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1},
        })
        res.status(200).json("unsubscribed successfully")
    }catch(err){
        next(err)
    }
}
export const like = async (req,res,next) => {
    const id = req.user.id
    const videoId = req.params.videoId
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id},
        })
       res.status(200).json('video is liked')
    }catch(err){
        next(err)
    }
}
export const dislike = async (req,res,next) => {
    const id = req.user.id
    const videoId = req.params.videoId
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id},
        })
       res.status(200).json('video is disliked')
    }catch(err){
        next(err)
    }
}