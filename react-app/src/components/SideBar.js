import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TabList from '@mui/lab/TabList';

const SideBar = (props) => {
    const drawerWidth = 360;

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
                <TabList />
                <Divider />
                {props.children}
            </Drawer>
        </Box>
    );
}

export default SideBar;