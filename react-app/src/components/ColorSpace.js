import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import React, { useState, useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import { rgbChannel } from '../function/wasm';

const ColorSpace = () => {
    const [expand, setExpand] = useState(false);
    // const [value, setValue] = useState(10);
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

    const didMount = React.useRef(false);

    useEffect(() => {
        if (didMount.current) {
            rgbChannel(rgb["red"].value, rgb["green"].value, rgb["blue"].value);
        } else {
            didMount.current = true;
        }
    }, [rgb])

    function handleRGB(name, newValue) {
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

    }

    const handleSlider = (event, newValue, activeThumb) => {
        const name = event.target.name;
        handleRGB(name, newValue);

    };

    const handleInputChange = (event) => {
        const realname = `${event.target.name}`;
        const name = realname.slice(0, realname.length - 1);

        handleRGB(name, event.target.value);
    };

    const handleBlur = (event) => {
        const realname = `${event.target.name}`;
        const name = realname.slice(0, realname.length - 1);

        if (event.target.value < 0) {
            handleRGB(name, 0)
        } else if (event.target.value > 255) {
            handleRGB(name, 255);
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
                        onChangeSlider={handleSlider} onChangeInput={handleInputChange}
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
                <Input name={`${props.name}s`} value={props.value} size="small" onChange={props.onChangeInput} onBlur={props.onBlur}
                    inputProps={{ max: props.max, type: 'number' }} />
            </Grid>

        </Grid>
    );
}


export default ColorSpace;