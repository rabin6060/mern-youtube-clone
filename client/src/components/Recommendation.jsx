import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from "styled-components"
const Container = styled.div`
  flex:1.5;
  `
const Recommendation = ({tags}) => {
   const [videos,setVideos] = useState([])
   useEffect(()=>{
    const fetchVideo = async ()=>{
      const res = await axios.get(`http://localhost:8000/api/videos/tags?tags=${tags}`)
      setVideos(res.data)
    }
    fetchVideo()
  },[tags])

   return (
    <Container>
        {
            videos.map(video=>(
                <Card key={video._id} videos={video} type="sm" />
            ))
        }
    </Container>
  )
}

export default Recommendation