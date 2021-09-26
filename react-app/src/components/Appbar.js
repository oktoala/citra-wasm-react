import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import TabList from '@mui/lab/TabList';
import PaletteIcon from '@mui/icons-material/Palette';
import FilterIcon from '@mui/icons-material/Filter';
import EqualizerIcon from '@mui/icons-material/Equalizer';


const Appbar = (props) => {

    const drawerWidth = 360;
    return (
        <AppBar position="fixed" color="secondary" sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}>
            <TabList onChange={props.onChange}>
                <Tooltip title="Color Space" value="0">
                    <Tab label={<PaletteIcon />}  />
                </Tooltip>
                <Tooltip title="Filter" value="1">
                    <Tab label={<FilterIcon />}  />
                </Tooltip>
                <Tooltip title="Histogram" value="2">
                    <Tab label={<EqualizerIcon />}  />
                </Tooltip>
            </TabList>
        </AppBar>
    );
}

export default Appbar;