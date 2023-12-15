import { createError } from "../error.js"
import Comment from "../model/Comment.js"
import Video from "../model/Video.js"
export const addComment = async(req,res,next) => {
    const comment = new Comment({...req.body,userId:req.user.id})
    try{
        const saveComment= await comment.save()
        res.status(200).json(saveComment)
    }catch(err){
        next(err)
    }
}
export const deleteComment = async(req,res,next) => {
    try{
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if(req.user.id===comment.userId || req.user.id===video.userId  ){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("comment has been deleted!")
        }else{
            next(createError(403,"you can only delete within your account"))
        }
    }catch(err){
        next(err)
    }
}
export const getComment = async(req,res,next) => {
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    }catch(err){
        next(err)
    }
}