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
import Divider from '@mui/material/Divider';


const Appbar = () => {
    const [value, setValue] = useState('1');

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    const drawerWidth = 240;
    return (
        <AppBar position="fixed" color="secondary" sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}>
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
    );
}

export default Appbar;