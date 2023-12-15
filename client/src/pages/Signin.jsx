import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { LoginFailure, LoginStart, LoginSuccess } from '../redux/userSlice'
import {auth,provider} from "../firebase"
import {signInWithPopup} from "firebase/auth"
import {useNavigate} from "react-router-dom"
const Container = styled.div` 
    height:calc(100vh - 56px);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    color:${({theme})=>theme.text};
`
const Wrapper = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:${({theme})=>theme.bgLighter};
    padding:20px 50px;
`
const Title = styled.h1`
    font-size:24px;
`
const SubTitle = styled.h2`
     font-size:20px;
     font-weight:300;
     margin-bottom:10px
`
const Input = styled.input`
    border:1px solid ${({theme})=>theme.soft};
    border-radius:5px;
    padding:10px;
    background-color:transparent;
    width:100%;
    margin-bottom:3px;
    color:${({theme})=>theme.text};
`
const Button = styled.button`
    border:none;
    border-radius: 5px;
    padding:5px 10px;
    margin-top:6px;
    background-color:${({theme})=>theme.soft};
    color:${({theme})=>theme.textSoft};
    cursor:pointer;
    margin-bottom:10px
`
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 4px;
`;

const Link = styled.span`
  margin-left: 30px;
`;
const Signin = () => {
  const {currentUser} = useSelector(state=>state.user)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogIn =async (e) => {
    e.preventDefault()
    dispatch(LoginStart())
    try {
      const res = await axios.post(`http://localhost:8000/api/auths/signin`,{name,password})
      dispatch(LoginSuccess(res.data))
    } catch (error) {
      dispatch(LoginFailure())
    }
  }
  const handleSignUp =async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8000/api/auths/signup",{name,email,password})
      dispatch(LoginSuccess(res.data))
    } catch (error) {
      console.log(error);
    }
   }
  const googlesignin = () => {
    dispatch(LoginStart())
    signInWithPopup(auth,provider)
    .then((result)=>{
      axios.post('http://localhost:8000/api/auths/google',{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL
      }).then((res)=>{
        dispatch(LoginSuccess(res.data))
      }).catch(err=>{
        dispatch(LoginFailure())
      })
    })
    .catch(err=>{console.log(err)})
  }
  
  return (
    <>
      {currentUser && navigate('/') }    
      <Container>
      <Wrapper>
          <Title>Sign In</Title>
          <SubTitle>to continue to Tube</SubTitle>
          <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
          <Input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
          <Button onClick={handleLogIn}>sigin</Button>
          <Title>Or</Title>
          <Button onClick={googlesignin}>Signin with Google</Button>
          <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
          <Input placeholder='email' onChange={e=>setEmail(e.target.value)}/>
          <Input type="password" placeholder='password' onChange={e=>setPassword(e.target.value)}/>
          <Button onClick={handleSignUp}>sigup</Button>
          
      </Wrapper>
      <More>
      English (USA)
          <Links>
                  <Link>Help</Link>
                  <Link>Privacy</Link>
                  <Link>Terms</Link>
          </Links>
      </More>
      </Container>
    </>

  )
}

export default Signin