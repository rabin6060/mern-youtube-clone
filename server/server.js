import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/users.js"
import videoRoute from "./routes/videos.js"
import commentRoute from "./routes/comments.js"
import authRoute from "./routes/auths.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
dotenv.config()

const connect = () => {
    mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log('connected to server')
    })
    .catch(err=>{throw err})
}
app.use(cookieParser())
app.use(express.json())
app.use('*',cors({
    origin:true,
    credentials:true
}))
app.use('/api/auths',authRoute)
app.use('/api/users',userRoute)
app.use('/api/videos',videoRoute)
app.use('/api/comments',commentRoute)
//error handling
app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || 'something went wrong'
    return res.status(status).json({
        sucess:false,
        status,
        message
    })
})
app.listen(process.env.PORT,()=>{
    connect()
    console.log('connected to 8000')
})
        

//EXseiWuBVyjbLNRE
//mongodb+srv://rabinmainali1999:EXseiWuBVyjbLNRE@cluster0.fddevxq.mongodb.net/?retryWrites=true&w=majority