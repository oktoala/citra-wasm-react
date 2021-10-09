import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import {appBarWidth} from '../lib/wasm';

const SideBar = (props) => {
    const drawerWidth = appBarWidth;

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders">
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }

                }}
                open>
                    <Toolbar variant="dense" />
                <Divider />
                {props.children}
            </Drawer>
        </Box>
    );
}

export default SideBar;