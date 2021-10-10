import React, { useState, useEffect } from 'react'
import { rgbChannel, hslChannel, rgbValue } from '../lib/wasm';
import { MyAccordion, MySlider } from './ColorSpacesComponent';

const ColorSpace = () => {
    const [expand, setExpand] = useState(false);
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

    const didMount = React.useRef(false);

    useEffect(() => {
        if (didMount.current) {
            // Ini akan dijalankan jika state rgb berubah
            rgbChannel(rgb["red"].value, rgb["green"].value, rgb["blue"].value);
            rgbValue.red = rgb["red"].value;
            rgbValue.green = rgb["green"].value;
            rgbValue.blue = rgb["blue"].value;
        } else {
            // Ini akan di jalankan pertama
            didMount.current = true;
        }
    }, [rgb]);

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

    const handleSlider = (event, newValue) => {
        const name = event.target.name;
        if (panel === 'RGB' && expand){
            handleRGB(name, newValue);
        }

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
        console.log(panel);
        setExpand(isExpanded ? panel : false);
        setPanel(panel);
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
            <MyAccordion expand={expand} colorspace="HSL" onChange={handleAccoridon('HSL')}>

            </MyAccordion>
            <MyAccordion expand={expand} colorspace="CMYK" onChange={handleAccoridon('CMYK')}>
            </MyAccordion>
        </div>
    )
}



export default ColorSpace;