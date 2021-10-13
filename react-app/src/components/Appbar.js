import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import TabList from '@mui/lab/TabList';
import PaletteIcon from '@mui/icons-material/Palette';
import FilterIcon from '@mui/icons-material/Filter';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { appBarWidth } from '../lib/wasm';

const Appbar = (props) => {

    const drawerWidth = appBarWidth;
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    function handleMenu(event) {
        setAnchor(event.currentTarget);
    }

    function handleCloseMenu(event) {
        setAnchor(null);
    }

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
                <IconButton aria-controls="menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleMenu}>
                    <MoreVertIcon />
                </IconButton>
                <Menu id="menu" anchorEl={anchor} open={open} onClose={handleCloseMenu} MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                    <label for="input-gambar" >
                        <MenuItem>
                            <InsertPhotoOutlinedIcon />
                            <Typography sx={{ marginLeft: 2 }}>
                                Ganti Gambar
                            </Typography>
                        </MenuItem>
                        <input accept="image/*" onChange={props.handleFile} id="input-gambar"  type="file"></input>
                    </label>
                    <Divider />
                    <MyItem icon={<GitHubIcon />} label="Source Code" href="https://github.com/oktoala/citra-wasm-react" />
                    <MyItem icon={<DescriptionIcon />} label="Documentation" href="https://docs.rs/photon-rs/0.3.1/photon_rs/" />
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

const MyItem = (props) => {
    return (
        <a href={props.href} target="_blank">
            <MenuItem >
                {props.icon}
                <Typography sx={{ marginLeft: 2 }}>
                    {props.label}
                </Typography>
            </MenuItem>
        </a>
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