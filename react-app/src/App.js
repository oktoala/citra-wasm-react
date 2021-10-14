import React from 'react';
import { useState, useEffect, useRef } from 'react';
// Component
import Appbar from "./components/Appbar";
import SideBar from './components/SideBar';
import Canvas from './components/Canvas';
import ColorSpace from './components/ColorSpace';
import Filter from './components/Filter';
import Histogram from './components/Histogram';
// Material UI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import darkScrollbar from '@mui/material/darkScrollbar';

import { loadWasm, drawOriginalImage } from './lib/wasm';
import img_src from './img/daisies.jpg';


const App = () => {

  const [tab, setTab] = useState("0");
  const [fileImg, setFileImg] = useState(img_src);
  const [load, setLoad] = useState(false);
  const handleTab = (event, newValue) => {
    setTab(newValue);
  };
  const canvasRef = useRef("canvas");

  useEffect(() => {
    loadWasm(canvasRef, fileImg);
  },
    // eslint-disable-next-line
    []);

  useEffect(() => {
    if (load) {
      drawOriginalImage(canvasRef, fileImg);
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
          <Appbar onChange={handleTab} >
            <input accept="image/*" onChange={(e) => setFileImg(URL.createObjectURL(e.target.files?.[0]))} id="input-gambar" type="file"></input>
          </Appbar>
          <SideBar >
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="0">
              <ColorSpace />
            </TabPanel >
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="1">
              <Filter />
            </TabPanel>
            <TabPanel sx={{ paddingRight: '0', }} value="2">
              <Histogram />
            </TabPanel>
          </SideBar>
        </TabContext>
        <Canvas>
          <canvas ref={canvasRef} />
          {/* <label htmlFor="input-gambar" >
          </label> */}
          <input accept="image/*"
            onChange={(e) => setFileImg(URL.createObjectURL(e.target.files?.[0]))}
            id="input-gambar" type="file"></input>
        </Canvas>
      </Box>
    </ThemeProvider >
  );
};

export default App;