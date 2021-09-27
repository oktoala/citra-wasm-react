import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const Canvas = (props) => {

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar variant="dense" />
            {props.children}
        </Box>
    )
}

export default Canvas;