import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Comments from '../components/Comments';
import {useLocation} from "react-router-dom"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dislikes, FetchSuccess, likes } from '../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
  display:flex;
  gap:24px;
  background-color:${({theme})=>theme.bg};
`
const Content = styled.div`
  flex:5;
`
const VideoWrapper = styled.div``
const Title = styled.h1`
  font-size:18px;
  font-weight:500;
  margin-top:20px;
  margin-bottom:10px;
  color:${({theme})=>theme.text}
`
const Details = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;  
`
const Info = styled.span`
  color:${({theme})=>theme.textSoft};
`
const Buttons = styled.div`

  display:flex;
  gap:20px;
  color:${({theme})=>theme.textSoft};
`
const Button = styled.div`
  display:flex;
  align-items:center;
  gap:3px;
  cursor:pointer;
`
const Hr = styled.hr`
  border:0.5px solid color:${({theme})=>theme.soft};
  margin:12px 0px;
`

const Channel = styled.div`
  display:flex;
  justify-content:space-between;  
`
const ChannelInfo = styled.div`
  display:flex;
  gap:20px
`
const Image = styled.img`
  width:50px;
  height:50px;
  border-radius:50%;
`
const ChannelDetail = styled.div`
  display:flex;
  flex-direction:column;
  color:${({theme})=>theme.text}
`
const ChannelName = styled.span`
  font-weight:500;
`
const ChannelCounter = styled.span`
  margin-top:5px;
  margin-bottom:10px;
  color:${({theme})=>theme.textSoft};
  font-size:12px
`
const Description = styled.p`
  font-size:12px;
`
const Subscription = styled.button`
  background-color: #cc1a00;
  font-weight:500;
  color:white;
  border-radius:5px;
  height:max-content;
  padding:10px 20px;
  cursor:pointer;
`
const VideoFrame = styled.video`
  max-height:720px;
  width:100%;
  object-fit:cover;
`
const Video = () => {
  const path = useLocation().pathname.split("/")[2]
  const {currentUser} = useSelector(state=>state.user)
  const {currentVideo} = useSelector(state=>state.video)

  const dispatch = useDispatch()
  const [user,setUser] = useState()
  
  
  useEffect(()=>{
    const fetchVideo = async ()=>{
      try {
        const videoRes = await axios.get(`http://localhost:8000/api/videos/find/${path}`)
        const userRes = await axios.get(`http://localhost:8000/api/users/find/${videoRes.data.userId}`)
        setUser(userRes.data)
        dispatch(FetchSuccess(videoRes.data))
      } catch (error) {
        console.log(error);
      }
    }
    fetchVideo()
  },[path,dispatch])
  const handleLike =async () => {
   await axios.put(`http://localhost:8000/api/users/like/${currentVideo._id}`)
   dispatch(likes(currentVideo._id))
  }
  const handleDislike =async () => {
    await axios.put(`http://localhost:8000/api/users/dislike/${currentVideo._id}`)
    dispatch(dislikes(currentVideo._id))
  }
  const handleSub = async ()=>{
    currentUser?.subscribedUsers?.includes(user._id) ? 
    await axios.put(`http://localhost:8000/api/users/unsub/${user._id}`):
    await axios.put(`http://localhost:8000/api/users/sub/${user._id}`)
    dispatch(subscription(user._id))
  }


  return (
    <Container>
      <Content>
        <VideoWrapper>
         <VideoFrame autoPlay src={currentVideo?.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views , {format(currentVideo?.createdAt)}</Info>
          <Buttons>
          <Button onClick={handleLike}>{(currentVideo?.likes.includes(currentUser?._id)) ? (<ThumbUpIcon/>):(<ThumbUpOffAltIcon/> )}{currentVideo?.likes.length}</Button>
          <Button onClick={handleDislike}>{(currentVideo?.dislikes.includes(currentUser?._id)) ? (<ThumbDownIcon/>):(<ThumbDownOffAltIcon/>) } dislike</Button>
          <Button><ReplyIcon/> share</Button>
          <Button><AddTaskIcon/> save</Button>
          </Buttons>
        </Details>
        <Hr/>
        <Channel>
          <ChannelInfo>
            <Image src={user?.img}/>
            <ChannelDetail>
              <ChannelName>{user?.name}</ChannelName>
              <ChannelCounter>{user?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscription onClick={handleSub}>{currentUser?.subscribedUsers?.includes(user?._id)?"SUBSCRIBED":"SUBSCRIBE"}</Subscription>
        </Channel>
        <Hr/>
        <Comments videoId={currentVideo?._id}/>
      </Content>
      <Recommendation tags={currentVideo?.tags}/>
    </Container>
  )
}

export default Video