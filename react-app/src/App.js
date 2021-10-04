import React from 'react';
import { useState, useEffect, useRef } from 'react';
// Component
import Appbar from "./components/Appbar";
import SideBar from './components/SideBar';
import Canvas from './components/Canvas';
import ColorSpace from './components/ColorSpace';
import Filter from './components/Filter';
// Material UI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { loadWasm, effectPipeline, alterChannel } from './function/wasm';



const App = () => {

  const [tab, setTab] = useState("0");

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };
  const canvasRef = useRef("canvas");

  useEffect(() => {
    loadWasm(canvasRef);

  },
    // eslint-disable-next-line
    [])

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TabContext value={tab}>
          <Appbar onChange={handleTab} />
          <SideBar >
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="0">
              <ColorSpace />
            </TabPanel >
            <TabPanel sx={{ paddingRight: '0', paddingLeft: '0' }} value="1">
              <Filter/>
            </TabPanel>
            <TabPanel value="2">Histogram</TabPanel>
          </SideBar>
        </TabContext>
        <Canvas>
          <canvas ref={canvasRef} />
        </Canvas>
      </Box>
    </ThemeProvider>
  );
};

export default App;