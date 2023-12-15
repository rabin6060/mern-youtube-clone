import { styled } from "styled-components"
import {Link} from "react-router-dom"
import {format} from "timeago.js"
import { useEffect, useState } from "react"
import axios from "axios"
const Container = styled.div`
    width:${(props)=>props.type!=="sm" && "350px"};
    margin-bottom:${(props)=>props.type==="sm" ? "10px":"20px"};
    cursor:pointer;
    display:${(props)=>props.type==="sm" && "flex"};
    align-items:center;
    gap:10px;
`

const Image = styled.img`
    width:100%;
    height:${(props)=>props.type==="sm" ? "150px":"200px"};
    background-color:#ccc;
    flex:1;
`

const Display = styled.div`
    display:flex;
    margin-top:${props=>props.type==="sm" ? "0px":"20px"};
    gap:5px;
    flex:1
`
const ChannelImage = styled.img`
    width:30px;
    height:30px;
    border-radius:50%;
    background-color:#999;
    display:${props=>props.type==="sm" && "none"};
`
const Txts = styled.div`
 margin-left:10px;
`
const Title = styled.h1`
    font-size:16px;
    font-weight:500;
    color:${({theme})=>theme.text}    
`
const ChannelName = styled.h3`
    font-size:14px;
    margin:9px 0px;
    color:${({theme})=>theme.textSoft}    `
const Info = styled.div`
    font-size:14px;
    color:${({theme})=>theme.textSoft} ; 
`

const Card = ({type,videos}) => {
  const [channel,setChannel] = useState({})

  useEffect(()=>{
    const fetchChannel = async ()=>{
      const response = await axios.get(`http://localhost:8000/api/users/find/${videos.userId}`)
      setChannel(response.data)
    }
    fetchChannel()
  },[type])
  return (
    <Link to={`/video/${videos._id}`} style={{textDecoration:"none"}}>
        <Container type={type}>
            <Image type={type} src={videos.imgUrl}/>
            
            <Display type={type}>
                <ChannelImage type={type} src={channel?.img}/>
                <Txts>
                    <Title>{videos.title}</Title>
                    <ChannelName>{channel?.name}</ChannelName>
                    <Info>{videos.views} views ,{format(videos.createdAt)}</Info>
                </Txts>
            </Display>
        </Container>
    </Link>
   
  )
}

export default Card