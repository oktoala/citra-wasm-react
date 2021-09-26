import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import PaletteIcon from '@mui/icons-material/Palette';
import FilterIcon from '@mui/icons-material/Filter';
import EqualizerIcon from '@mui/icons-material/Equalizer';


const Appbar = (props) => {
    
    const drawerWidth = 240;
    return (
        <AppBar position="fixed" color="secondary" sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}>
            <TabList onChange={props.onChange}>
                <Tab label={<PaletteIcon/>} value="0"/>
                <Tab label={<FilterIcon/>} value="1"/>
                <Tab label={<EqualizerIcon/>} value="2"/>
            </TabList>
        </AppBar>
    );
}

export default Appbar;