import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

const ColorSpace = () => {
    const [expand, setExpand] = useState(false);
    const [value, setValue] = useState(10);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 255) {
            setValue(255);
        }
    };

    const handleAccoridon = (panel) => (event, isExpanded) => {
        setExpand(isExpanded ? panel : false);
    }

    return (
        <div>
            <MyAccordion expand={expand} colorspace="RGB" onChange={handleAccoridon('RGB')}>
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='red' />
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='green' />
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='#005BFF' />
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="HSL" onChange={handleAccoridon('HSL')}>Hue Saturate Light</MyAccordion>
            <MyAccordion expand={expand} colorspace="CMYK" onChange={handleAccoridon('CMYK')}>
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='cyan' />
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='magenta' />
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='yellow' />
                <MySlider value={value} onChangeSlider={handleSliderChange} onChangeInput={handleInputChange}
                    onBlur={handleBlur} max={255} color='white' />
            </MyAccordion>
        </div>
    )
}

const MyAccordion = (props) => {
    return (
        <Accordion expanded={props.expand === props.colorspace} onChange={props.onChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {props.colorspace}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </Accordion>
    );
}

const MySlider = (props) => {

    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item xs>
                <Slider sx={{ color: props.color, width: 255 }} max={props.max} value={typeof props.value === 'number' ? props.value : 0} onChange={props.onChangeSlider} />
            </Grid>
            <Grid item xs>
                <Input value={props.value} size="small" onChange={props.onChangeInput} onBlur={props.onBlur}
                    inputProps={{ max: props.max, type: 'number' }} />
            </Grid>

        </Grid>
    );
}


export default ColorSpace;