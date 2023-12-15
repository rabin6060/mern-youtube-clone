import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import Comment from './Comment'
const Container = styled.div`
    
`
const NewComments = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
`
const Avatar = styled.img`
  width:50px;
  height:50px;
  border-radius:50%;
`
const Input = styled.input`
    border:none;
    background-color:transparent;
    padding:10px 20px;
    width:100%;
    outline:none;
    border-bottom:1px solid ${({theme})=>theme.softLight}
`
const Comments = ({videoId}) => {
  const [comments,setComment] = useState([])
  const {currentUser} = useSelector(state=>state.user)

  useEffect(()=>{
    const fetchComments = async () => {
      try {
       const res =  await axios.get(`http://localhost:8000/api/comments/${videoId}`)
       setComment(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments()
  },[videoId])

  return (
    <Container>
        <NewComments>
            <Avatar src={currentUser?.img}/>
            <Input placeholder='Add a comment.'/>
        </NewComments>
        {
          comments.map(comment=>(
            <Comment key={comment._id} comment={comment}/>
          ))
        }
    </Container>
  )
}

export default Comments