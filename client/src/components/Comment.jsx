import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { format } from 'timeago.js'
const Container = styled.div`
    display: flex;
    gap:10px;
    margin:30px 0px;
`
const Avatar = styled.img`
  width:50px;
  height:50px;
  border-radius:50%;
`
const Details= styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    color:${({theme})=>theme.text};
`
const Name = styled.span`
    font-size:13px;
    font-weight:500;
`
const Dates = styled.span`
font-size:12px;
font-weight:400;
color:${({theme})=>theme.textSoft};

`
const Text = styled.span`
font-size:14px;
`

const Comment = ({comment}) => {
  const [userChannel,setUserChannel] = useState({})
  useEffect(()=>{
    const fetchCommentUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/users/find/${comment.userId}`)
            setUserChannel(res.data)          
        } catch (error) {
            console.log(error);
        }

    }
    fetchCommentUser()
  },[comment.userId])

  return (
    <Container>
        <Avatar src={userChannel.img}/>
        <Details>
            <Name>
                {userChannel.name} <Dates>{format(userChannel.createdAt)}</Dates>
            </Name>
            <Text>
                {comment.desc}
            </Text>
        </Details>
    </Container>
  )
}

export default Comment