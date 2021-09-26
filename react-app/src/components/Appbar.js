import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
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
                <TabTip title="Color Space" icon={<PaletteIcon/>} value="0" />
                <TabTip title="Filter" icon={<FilterIcon/>} value="1" />
                <TabTip title="Histogram" icon={<EqualizerIcon/>} value="2" />
            </TabList>
        </AppBar>
    );
}

const TabTip = (props) => {

    return (
        <Tooltip title={props.title} value={props.value}>
            <Tab label={props.icon} value={props.value}/>
        </Tooltip>
    );
}

export default Appbar;