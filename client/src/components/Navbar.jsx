import { styled } from "styled-components"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {useDispatch, useSelector} from "react-redux"
import SearchIcon from '@mui/icons-material/Search';
import { Link,useNavigate } from "react-router-dom";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Logout } from "../redux/userSlice";
import { useState } from "react";
import Upload from "./Upload";
const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme})=>theme.bgLighter};
height:56px;
`
const Wrapper = styled.div`
display:flex;
justify-content:flex-end;
align-items:center;
height:100%;
padding:0px 20px
`
const Search = styled.div`
width:40%;
position:absolute;
left:0px;
right:0px;
margin:auto;
display:flex;
align-items:center;
justify-content:space-between;
gap:5px;
padding:5px;
border:1px solid #ccc;
border-radius:5px;
color:${({theme})=>theme.text};
`
const Input = styled.input`
  width:100%;
  border:none;
  outline:none;
  background-color:transparent;
  color:${({theme})=>theme.text};
`
const Button = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border:1px solid #3ea6ff ;
  border-radius:20px;
  color: #3ea6ff;
  border-radius:3px;
  font-weight:500;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:5px;
`
const User = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
  color:${({theme})=>theme.text};
  font-weight:500;
`
const Avatar = styled.img `
  width:30px;
  height:30px;
  border-radius:50%;
  background:#999;
`

export default function Navbar() {
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [q,setQ] = useState("")

  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const handleLogOut=(e)=>{
    e.preventDefault()
    dispatch(Logout())
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e=>setQ(e.target.value)}/>
            <SearchIcon onClick={()=>navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser? 
          (<User>
            <VideoCallIcon onClick={()=>setOpen(true)} style={{cursor:"pointer"}}/>
            <Avatar src={currentUser.img}/>
            {currentUser.name}
            <Button onClick={handleLogOut}>Logout</Button>
          </User> ):
          (<Link to="signin" style={{textDecoration:"none"}}>
            <Button>
              <AccountCircleOutlinedIcon/>
              SIGN IN
            </Button>
          </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}/>}
    </>

  )
}
