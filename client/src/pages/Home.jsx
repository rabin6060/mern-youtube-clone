import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { styled } from 'styled-components'
import Card from '../components/Card'
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap
`
const Home = ({type}) => {
  const [videos,setVideo] = useState([])
  useEffect(()=>{
    const fetchVideo = async ()=>{
      const response = await axios.get(`http://localhost:8000/api/videos/${type}`)
      setVideo(response.data)
    }
    fetchVideo()
  },[type])

  return (
    <Container>
    {
      videos.map(video=>(
        <Card key={video._id} videos={video} />
      ))
    }
    </Container>
  )
}

export default Home