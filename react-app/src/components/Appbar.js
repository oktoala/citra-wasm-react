import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PaletteIcon from '@mui/icons-material/Palette';
import IconButton from '@mui/material/IconButton';
import FilterIcon from '@mui/icons-material/Filter';
import EqualizerIcon from '@mui/icons-material/Equalizer';


const Appbar = () => {
    const [value, setValue] = useState('1');

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="navbar">
            <Box sx={{ flexgrow: 1 }}>
                <AppBar position="static" color="secondary" >
                    <Toolbar>
                        <IconButton color="inherit">
                            <PaletteIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <FilterIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <EqualizerIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box component="nav"
                aria-label="mailbox folders">
                    <Drawer variant="permanent" >
                        <p>Hah</p>
                    </Drawer>
            </Box>
        </div>
    );
}

export default Appbar;