import React, { useState, useEffect  } from 'react'
import { rgbChannel, rgbValue } from '../lib/wasm';
import { MyAccordion, MySlider } from './MyAccordion';
import ColorSpace from './ColorSpace';
import { isExpanded } from '../lib/wasm';
import CannyEdge from './CannyEdge';
import WaterShed from './WaterShed';

const Enhancement = () => {
    const [expand, setExpand] = useState(isExpanded.value);
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
            didMount.current = true;
        }
    }, [rgb]);

    function handleState(name, newValue) {
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
        // isExpanded.value = expanded ? panel : false;
    }

    return (
        <div>
            <MyAccordion expand={expand} colorspace="Channels" onChange={handleAccoridon('Channels')}>
                {Object.keys(rgb).map((key, index) => {
                    return (
                        <MySlider key={index} name={rgb[key].name} id={index.toString()} value={rgb[key].value}
                            onChangeSlider={handleSlider} onChangeInput={handleInputChange}
                            onBlur={handleBlur} max={255} color={rgb[key].color} />);
                })}
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="Color Space" onChange={handleAccoridon('Color Space')}>
                <ColorSpace />
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="Canny Detection" onChange={handleAccoridon('Canny Detection')}>
                <CannyEdge/>
            </MyAccordion>
            <MyAccordion expand={expand} colorspace="WaterShed Segmentation" onChange={handleAccoridon('WaterShed Segmentation')}>
                <WaterShed/>
            </MyAccordion>
        </div>
    )
}

export default Enhancement;