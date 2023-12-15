import { useEffect,useState } from "react"
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage"
import styled from "styled-components"
import app from "../firebase"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Container =styled.div `
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:#000000a7;
    display:flex;
    align-items:center;
    justify-content:center;
`
const Wrapper =styled.div `
    width:40%;
    height:50%;
    background-color:${({theme})=>theme.bgLighter};
    color:${({theme})=>theme.text};
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:10px;
    position:relative;
    
`
const Close =styled.div `
    position:absolute;
    top:10px;
    right:10px;
    cursor:pointer;
`
const Title =styled.h1 `
text-align:center;
`
const Input = styled.input `
    background:transparent;
    outline:none;
    color:${({theme})=>theme.text};
    padding:10px;
    border:1px solid ${({theme})=>theme.soft};
    border-radius:5px;
`
const Description = styled.textarea `
    background:transparent;
    outline:none;
    color:${({theme})=>theme.text};
    padding:10px;
    border:1px solid ${({theme})=>theme.soft};
    border-radius:5px;
`
const Button = styled.button `
    background:transparent;
    outline:none;
    color:${({theme})=>theme.text};
    padding:10px;
    border:1px solid ${({theme})=>theme.soft};
    border-radius:5px;
    cursor:pointer;
`
const Label = styled.label`
    font-size:14px;
`
const Upload = ({setOpen}) => {
    console.log(setOpen);
  const navigate = useNavigate()
  const [image,setImage] = useState(undefined)
  const [video,setVideo] = useState(undefined)
  const [imgPerc,setImgPerc] = useState(0)
  const [vidPerc,setVidPerc] = useState(0)
  const [tags,setTag] = useState(undefined)
  const [inputs,setInputs] = useState([])
  const handleChange = (e) => {
    setInputs((prev)=>{
        return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleTag = (e) => {
    setTag(e.target.value.split(","))
  }
  const handleUpload = async (e) => {
    e.preventDefault()
    const res =await axios.post("http://localhost:8000/api/videos",{...inputs,tags})
    setOpen(false)
    res.status===200 && navigate(`/video/${res.data._id}`)
  }
  const uploadFile = (file,urlType) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime()+file?.name
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed', 
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    urlType==="imgUrl" ? setImgPerc(Math.round(progress)):setVidPerc(Math.round(progress))
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is changed.');
                        break;
                    default:
                        break;
                    }
                    
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    console.log('log errors.');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setInputs((prev)=>{
                            return {...prev,[urlType]:downloadURL}
                        })
                    });
                  }
                )}

  useEffect(()=>{video && uploadFile(video,"videoUrl")},[video])
  useEffect(()=>{image && uploadFile(image,"imgUrl")},[image])
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a new Video</Title>
            <Label>Video</Label>
            {vidPerc>0?("uploading"+vidPerc+"%"):(<Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])} />)}
            <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
            <Description placeholder="Description" rows={10} name="desc" onChange={handleChange} />
            <Input type="text" placeholder="seperate the tags using coma." onChange={handleTag}/>
            <Label>Image</Label>
            {imgPerc>0?("uploading"+imgPerc+"%"):(<Input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />  )}
            <Button onClick={handleUpload}>Upload</Button>   
        </Wrapper>
    </Container>
  )
}

export default Upload