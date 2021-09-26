import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion from '@mui/material/Accordion';
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { AccordionDetails } from '@mui/material';

const ColorSpace = () => {
    const [expand, setExpand] = useState(false);

    const handleAccoridon = (panel) => (event, isExpanded) => {
        setExpand(isExpanded ? panel : false);
    }

    return (
        <div>
            <MyAccordion expand={expand} colorspace="RGB" onChange={handleAccoridon('RGB')}>Red Green Blue</MyAccordion>
            <MyAccordion expand={expand} colorspace="HSL" onChange={handleAccoridon('HSL')}>Hue Saturate Light</MyAccordion>
            <MyAccordion expand={expand} colorspace="CMYK" onChange={handleAccoridon('CMYK')}>Cyan Magenta Yellow K</MyAccordion>
        </div>
    )
}

const MyAccordion = (props) => {
    return (
        <Accordion expanded={props.expand === props.colorspace} onChange={props.onChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
                <Typography sx={{ width: '33%', flexShrink: 0}}>
                    {props.colorspace}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </Accordion>
    );
}

export default ColorSpace;