import express from "express"
import { addVideo,updateVideo,deleteVideo,getVideo, addView, trend, random, sub, getByTag, getBySearch } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()
router.post('/',verifyToken,addVideo)
router.patch('/:id',verifyToken,updateVideo)
router.delete('/:id',verifyToken,deleteVideo)
router.get('/find/:id',getVideo)
router.patch('/view/:id',addView)
router.get('/trend',trend)
router.get('/random',random)
router.get('/sub',verifyToken,sub)
router.get('/tags',getByTag)
router.get('/search',getBySearch)
export default router