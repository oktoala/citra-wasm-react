import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import { appBarWidth } from '../lib/wasm';

const SideBar = (props) => {
    const drawerWidth = appBarWidth;

    // const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders">
            <Drawer
                variant="temporary"
                open={props.open}
                onClose={props.onClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', height: '40%' },
                }}
                anchor="bottom"
            >
                {props.children}
            </Drawer>
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