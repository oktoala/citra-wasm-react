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
    const [rgb, setRgb] = useState({
        'red': {
            'name': 'red',
            'color': '#ff0000',
            'value': 0,
        },
        'green': {
            'name': 'green',
            'color': '#00ff00',
            'value': 0
        },
        'blue': {
            'name': 'blue',
            'color': '#005BFF',
            'value': 0
        },
    });

    const handleRGB = (event, newValue, activeThumb) => {
        const name = event.target.name;
        setRgb(prev => ({
            'red': name === rgb.red.name ? {
                ...prev.red,
                'value': newValue,
            } : { ...prev.red },
            'green': name === rgb.green.name ? {
                ...prev.green,
                'value': newValue,
            } : { ...prev.green },
            'blue': name === rgb.blue.name ? {
                ...prev.blue,
                'value': newValue,
            } : { ...prev.blue }
        }));
    };
    
    const handleInputChange = (event) => {
        // console.log(event.target.value);
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
        const name = `${event.target.name}`;
        setRgb(prev => ({
            'red': name === rgb.red.name ? {
                ...prev.red,
                'value': event.target.value,
            } : { ...prev.red },
            'green': name === rgb.green.name ? {
                ...prev.green,
                'value': event.target.value,
            } : { ...prev.green },
            'blue': name === rgb.blue.name ? {
                ...prev.blue,
                'value': event.target.value,
            } : { ...prev.blue }
        }));
        console.log(event.target.value);
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
                {Object.keys(rgb).map((key, index) => {
                    return (<MySlider key={index} name={rgb[key].name} id={index.toString()} value={rgb[key].value}
                        onChangeSlider={handleRGB} onChangeInput={handleInputChange}
                        onBlur={handleBlur} max={255} color={rgb[key].color} />);
                })}
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="HSL" onChange={handleAccoridon('HSL')}>Hue Saturate Light</MyAccordion>
            <MyAccordion expand={expand} colorspace="CMYK" onChange={handleAccoridon('CMYK')}>
                <Slider data-index={0} onChange={(event, value, activeThumb) => console.log(activeThumb)} ></Slider>
                <Slider tabIndex={0} onChange={(event, value, activeThumb) => console.log(activeThumb)} ></Slider>
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
        <Grid key={props.id} id={props.id} container spacing={3} alignItems="center">
            <Grid item xs>
                <Slider name={props.name} sx={{ color: props.color, width: 255 }} max={props.max}
                    value={props.value} onChange={props.onChangeSlider} />
            </Grid>
            <Grid item xs>
                <Input name={`${props.name}`} value={props.value} size="small" onChange={props.onChangeInput} onBlur={props.onBlur}
                    inputProps={{ max: props.max, type: 'number' }} />
            </Grid>

        </Grid>
    );
}


export default ColorSpace;