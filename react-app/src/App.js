import React from 'react';
import { useState, useEffect, useRef } from 'react';
// Component
import Appbar from "./components/Appbar";
import SideBar from './components/SideBar';
import Enhancement from './components/Enhancement';
import Filter from './components/Filter';
import Histogram from './components/Histogram';
// Material UI
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import darkScrollbar from '@mui/material/darkScrollbar';
import { loadWasm, drawOriginalImage, filter, getCV2 } from './lib/wasm';
import img_src from './img/daisies.jpg';
import { OpenCvProvider, useOpenCv } from 'opencv-react';

const Canvas = (props) => {
  const { cv } = useOpenCv()

  useEffect(() => {
    if (cv) {
      console.log(cv);
      getCV2(cv);
    }
  }, [cv])
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar variant="dense" />
      {props.children}
    </Box>
  )
}

const App = () => {

  const [tab, setTab] = useState("0");
  const [fileImg, setFileImg] = useState(img_src);
  const [load, setLoad] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };
  const onLoaded = (cv) => {
    console.log('opencv loaded, cv')
  }
  const canvasRef = useRef("canvas");

  useEffect(() => {
    loadWasm(canvasRef, fileImg);
  },
    // eslint-disable-next-line
    []);

  useEffect(() => {
    if (load) {
      drawOriginalImage(canvasRef, fileImg);
      filter('none');
    } else {
      setLoad(true);
    }
  },
    // eslint-disable-next-line
    [fileImg]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: darkScrollbar(),
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TabContext value={tab}>
          <Appbar handleDrawerToggle={handleDrawerToggle} onChange={handleTab} />
          <SideBar open={mobileOpen} onClose={handleDrawerToggle} >
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="0">
              <Enhancement />
            </TabPanel>
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="1">
              <Filter />
            </TabPanel>
            <TabPanel sx={{ paddingRight: '0', }} value="2">
              <Histogram />
            </TabPanel>
          </SideBar>
        </TabContext>
        <OpenCvProvider onLoad={onLoaded} openCvPath='/opencv/opencv.js'>
          <Canvas>
            <canvas ref={canvasRef} />
            <input accept="image/*" onChange={(e) => setFileImg(URL.createObjectURL(e.target.files?.[0]))} id="input-gambar" type="file" />
          </Canvas>
        </OpenCvProvider>
      </Box>
    </ThemeProvider >
  );
};



export default App;
