import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import TabList from '@mui/lab/TabList';
import PaletteIcon from '@mui/icons-material/Palette';
import FilterIcon from '@mui/icons-material/Filter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';

const Appbar = (props) => {

    const drawerWidth = 360;
    return (
        <AppBar position="fixed" color="secondary" sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}>
            <Toolbar variant="dense" sx={{ padding: 0, }}>
                <TabList onChange={props.onChange} sx={{ flexGrow: 1, borderBottomColor: 'red' }}>
                    <Tooltip title="Color Space" value="0">
                        <Tab label={<PaletteIcon />} sx={{}} />
                    </Tooltip>
                    <Tooltip title="Filter" value="1">
                        <Tab label={<FilterIcon />} />
                    </Tooltip>
                    <Tooltip title="Histogram" value="2" >
                        <Tab label={<EqualizerIcon />} />
                    </Tooltip>
                </TabList>
                <IconNav title="Source Code" href="https://github.com/oktoala/citra-wasm-react" >
                    <GitHubIcon />
                </IconNav>
                <Button size="small" href="https://docs.rs/photon-rs/0.3.1/photon_rs/" target="_blank" variant="contained">Docs</Button>
            </Toolbar>
        </AppBar>
    );
}

const IconNav = (props) => {
    return (
        <IconButton sx={{ marginRight: 3 }} href={props.href} target="_blank">
            <Tooltip title={props.title}>
                {props.children}
            </Tooltip>
        </IconButton>
    )
}

export default Appbar;