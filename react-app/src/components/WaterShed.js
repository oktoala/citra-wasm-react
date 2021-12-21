import React from 'react';
import  Button  from '@mui/material/Button';
import { waterShed } from '../lib/wasm';

const WaterShed = () => {

    return(
        <Button onClick={() => waterShed() } >
            WaterShed Segmentation
        </Button>
    );
}

export default WaterShed;