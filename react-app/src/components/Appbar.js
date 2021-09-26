import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';

const Appbar = () => {
    return (
        <Box sx={{ flexgrow: 1}}>
            <AppBar position="static" >
                <Toolbar>
                    <p>Haha</p>
                </Toolbar>
            </AppBar>

        </Box>
    )
}

export default Appbar;