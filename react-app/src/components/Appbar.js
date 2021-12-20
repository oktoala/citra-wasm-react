import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import TabList from '@mui/lab/TabList';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import FilterHdrOutlinedIcon from '@mui/icons-material/FilterHdrOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
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

    function handleClose(event) {
        setAnchor(null);
    }

    return (
        <AppBar position="fixed" color="secondary" sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}>
            <Toolbar variant="dense" sx={{ padding: 0, }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <TabList onChange={props.onChange} sx={{ flexGrow: 1, borderBottomColor: 'red' }}>
                    <Tooltip title="Enhacement" value="0">
                        <Tab label={<PaletteOutlinedIcon />} />
                    </Tooltip>
                    <Tooltip title="Filter" value="1">
                        <Tab label={<FilterHdrOutlinedIcon />} />
                    </Tooltip>
                    <Tooltip title="Histogram" value="2" >
                        <Tab label={<EqualizerOutlinedIcon />} />
                    </Tooltip>
                </TabList>
                <IconButton aria-controls="menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleMenu}>
                    <MoreVertIcon />
                </IconButton>
                <Menu id="menu" anchorEl={anchor} open={open} onClose={handleClose} MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                    <label htmlFor="input-gambar" >
                        <MyItem oc={handleClose} icon={<InsertPhotoOutlinedIcon />} label="Ganti Gambar" />
                        {/* <input accept="image/*" onChange={props.onFile} id="input-gambar" type="file"></input> */}
                    </label>
                    <Divider />
                    <MyItem oc={handleClose} icon={<GitHubIcon />} label="Source Code" href="https://github.com/oktoala/citra-wasm-react" />
                    <MyItem oc={handleClose} icon={<DescriptionOutlinedIcon />} label="Documentation" href="https://docs.rs/photon-rs/0.3.1/photon_rs/" />
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

const MyItem = (props) => {
    return (
        <a rel="noreferrer" href={props.href} target="_blank">
            <MenuItem onClick={props.oc}>
                {props.icon}
                <Typography sx={{ marginLeft: 2 }}>
                    {props.label}
                </Typography>
            </MenuItem>
        </a>
    );
}

export default Appbar;