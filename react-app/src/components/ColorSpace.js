import React, {useState} from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { colorSpace, spaceValue } from '../lib/wasm';

const ColorSpace = () => {
    const [index, setIndex] = useState(spaceValue.index);
    
    const listFeature = [
        'None', 'RGB2HSV', 'RGB2Lab', 'RGB2Luv'
    ];

    function handleList(event, index, value) {
        setIndex(index);
        colorSpace(value);
        spaceValue.index = index;
        spaceValue.space = value;
    }

    return (
        <List>
            {listFeature.map((value, indexList) => {
                return (
                    <ListItemButton key={indexList} selected={index === indexList} onClick={event => handleList(event, indexList, value)}>
                        <ListItemText primary={value} />
                    </ListItemButton>
                );
            })}
        </List>
    )
}

export default ColorSpace;