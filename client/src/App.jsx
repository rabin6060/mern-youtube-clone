import { useState } from "react";
import styled, { ThemeProvider } from "styled-components"
import Menu from "./components/Menu"
import Navbar from "./components/Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { darkTheme,lightTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import axios from "axios";
import Search from "./components/Search";
const Container = styled.div`
    display:flex;
    `
const Main = styled.div`
  flex:7;
  background-color:${({theme})=>theme.bg};
`
const Wrapper = styled.div`
padding:20px 90px;
`
export default function App() {
  const [darkMode,setDarkMode]=useState(true)
  axios.defaults.withCredentials = true
  return (
    <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Main>
            <Navbar/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trend" element={<Home type="trend"/>} />
                  <Route path="sub" element={<Home type="sub"/>} />
                  <Route path="search" element={<Search/>} />
                  <Route path="signin" element={<Signin/>} />
                  <Route path="video">
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
    
  )
}
