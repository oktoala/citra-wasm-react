import React, { useState, useEffect } from 'react'
import { rgbChannel, hslChannel, rgbValue, hslValue } from '../lib/wasm';
import { MyAccordion, MySlider } from './ColorSpacesComponent';
import { isExpanded } from '../lib/wasm';
import Button from '@mui/material/Button';

const ColorSpace = () => {
    const [expand, setExpand] = useState(isExpanded.value);
    const [panel, setPanel] = useState('');
    const [rgb, setRgb] = useState({
        'red': {
            'name': 'red',
            'color': '#ff0000',
            'value': rgbValue.red,
        },
        'green': {
            'name': 'green',
            'color': '#00ff00',
            'value': rgbValue.green
        },
        'blue': {
            'name': 'blue',
            'color': '#005BFF',
            'value': rgbValue.blue
        },
    });

    const [hsl, setHsl] = useState({
        'hue': {
            'name': 'hue',
            'color': 'white',
            'value': hslValue.hue,
        },
        'saturate': {
            'name': 'saturate',
            'color': '#4f4f4f',
            'value': hslValue.saturate,
        },
        'lightness': {
            'name': 'lightness',
            'color': 'white',
            'value': hslValue.lightness,
        }
    });

    const didMount = React.useRef(true);

    useEffect(() => {
        if (didMount.current) {
            // Ini akan dijalankan jika state rgb berubah
            rgbChannel(rgb["red"].value, rgb["green"].value, rgb["blue"].value);
            rgbValue.red = rgb["red"].value;
            rgbValue.green = rgb["green"].value;
            rgbValue.blue = rgb["blue"].value;
        } else {
        }
    }, [rgb]);

    function handleState(name, newValue) {

        if (panel === 'RGB' && expand) {
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
        } else if (panel === 'HSL' && expand) {
            setHsl(prev => ({
                'hue': name === hsl.hue.name ? {
                    ...prev.hue,
                    'value': newValue
                } : { ...prev.hue },
                'saturate': name === hsl.saturate.name ? {
                    ...prev.saturate,
                    'value': newValue,
                } : { ...prev.saturate },
                'lightness': name === hsl.lightness.name ? {
                    ...prev.lightness,
                    'value': newValue,
                } : { ...prev.lightness },
            }));
        }

    }

    const handleSlider = (event, newValue) => {
        const name = event.target.name;
        handleState(name, newValue);

    };

    const handleInputChange = (event) => {
        const realname = `${event.target.name}`;
        const name = realname.slice(0, realname.length - 1);

        handleState(name, event.target.value);
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

    const handleAccoridon = (panel) => (event, expanded) => {
        setExpand(expanded ? panel : false);
        setPanel(panel);
        // isExpanded.value = expanded ? panel : false;
    }

    return (
        <div>
            <MyAccordion expand={expand} colorspace="RGB" onChange={handleAccoridon('RGB')}>
                {Object.keys(rgb).map((key, index) => {
                    return (
                        <MySlider key={index} name={rgb[key].name} id={index.toString()} value={rgb[key].value}
                            onChangeSlider={handleSlider} onChangeInput={handleInputChange}
                            onBlur={handleBlur} max={255} color={rgb[key].color} />);
                })}
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="HSL" onChange={handleAccoridon('HSL')}>
                {Object.keys(hsl).map((key, index) => {
                    return (
                        <MySlider key={index} name={hsl[key].name} id={index.toString()} value={hsl[key].value}
                            onChangeSlider={handleSlider} onChangeInput={handleInputChange}
                            onBlur={handleBlur} max={hsl[key].name === 'hue' ? 360 : 100} color={hsl[key].color} />);
                })}
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="CMYK" onChange={handleAccoridon('CMYK')}>
                <Button variant="contained" >
                    Edge
                </Button>
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="" onChange={handleAccoridon('')}>
                <Button variant="contained" >
                    Edge
                </Button>
            </MyAccordion>
        </div>
    )
}



export default ColorSpace;