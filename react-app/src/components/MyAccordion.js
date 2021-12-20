import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';

export const MyAccordion = (props) => {
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

export const MySlider = (props) => {

    return (
        <Grid key={props.id} id={props.id} container spacing={3} alignItems="center">
            <Grid className={props.name} item xs>
                <Slider name={props.name} sx={{ color: props.color, width: 360 }} max={props.max}
                    value={props.value} onChange={props.onChangeSlider} />
            </Grid>
            <Grid item xs>
                <Input name={`${props.name}s`} value={props.value} size="small" onChange={props.onChangeInput} onBlur={props.onBlur}
                    inputProps={{ max: props.max, type: 'number' }} />
            </Grid>

        </Grid>
    );
}

export const HueSlider = (props) => {
    return (
        <Grid  key={props.id} id={props.id} container spacing={3} alignItems="center">
            <Grid className={props.name} item xs>
                <Slider name={props.name} sx={{ color: 'white', width: 360 }}
                    value={props.value} onChange={props.onSlider} />
            </Grid>
            <Grid item xs>
                <Input name={`${props.name}s`} value={props.value} size="small" onChange={props.onInput} onBlur={props.onBlur}
                    inputProps={{ max: props.max, type: 'number' }} />
            </Grid>
        </Grid>
    )
}