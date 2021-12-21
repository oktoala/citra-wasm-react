import React, {useState} from 'react';
import  Button  from '@mui/material/Button';
import  Typography  from '@mui/material/Typography';
import { ColorPicker, createColor } from 'material-ui-color';
import { waterShed } from '../lib/wasm';

const WaterShed = () => {
    const [value, setValue] = useState(createColor('#ff0000'));
    const [rgb, setRgb] = useState([255, 0, 0]);

    const handleValue = (value) => {
        const red = value['rgb'][0];
        const green = value['rgb'][1];
        const blue = value['rgb'][2];
        setRgb([red, green, blue])
        setValue(value);
    }

    return(
        <div>
        <Typography>
            Marker Color
        </Typography>
        <ColorPicker onChange={handleValue}  value={value} hideTextfield ></ColorPicker>
        <Button sx={{ marginTop: 3}} onClick={() => waterShed(rgb[0], rgb[1], rgb[2]) } >
            WaterShed Segmentation
        </Button>
        </div>
    );
}

export default WaterShed;