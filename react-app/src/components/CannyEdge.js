import React, { useState, useEffect } from 'react';
import { MySlider } from './MyAccordion';
import { cannyEdge, cannyValue } from '../lib/wasm';
import  Typography  from '@mui/material/Typography';

const CannyEdge = () => {

    const [canny, setCanny] = useState({
        'lower': {
            'name': 'lower',
            'color': '#000000',
            'value': cannyValue.lower,
        },
        'upper': {
            'name': 'upper',
            'color': '#ffffff',
            'value': cannyValue.upper,
        }
    });

    const didMount = React.useRef(false);


    useEffect(() => {
        if (didMount.current) {
            cannyEdge(canny.lower.value, canny.upper.value);
            cannyValue.lower = canny.lower.value;
            cannyValue.upper = canny.upper.value;
        } else {
            didMount.current = true;
        }
    }, [canny]);

    function handleState(name, newValue) {
        setCanny(prev => ({
            'lower': name === canny.lower.name ? {
                ...prev.lower,
                'value': newValue,
            } : { ...prev.lower },
            'upper': name === canny.upper.name ? {
                ...prev.upper,
                'value': newValue,
            } : { ...prev.upper },
        }));
    }

    const handleSlider = (event, newValue) => {
        const name = event.target.name;
        handleState(name, newValue);

    };

    const handleInputChange = (event) => {
        const realname = `${event.target.name}`;
        const name = realname.slice(0, realname.length - 1);

        handleState(name, parseFloat(event.target.value));
    };

    const handleBlur = (event) => {
        const realname = `${event.target.name}`;
        const name = realname.slice(0, realname.length - 1);

        if (event.target.value < 0) {
            handleState(name, 0)
        } else if (event.target.value > 255) {
            handleState(name, 255);
        }
    };

    return (
        <div>
            {Object.keys(canny).map((key, index) => {
                return (
                    <div>
                        <Typography component="h2">Threshold {index+1} </Typography>
                        <MySlider key={index} name={canny[key].name} value={canny[key].value}
                            onChangeSlider={handleSlider} onChangeInput={handleInputChange}
                            onBlur={handleBlur} max={100} color={canny[key].color} />
                    </div>
                );
            })}
        </div>
    )
}

export default CannyEdge;