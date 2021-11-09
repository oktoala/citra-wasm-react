import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { filter, filterValue } from '../lib/wasm';

const Filter = () => {

    const [index, setIndex] = useState(filterValue.index);

    const listFilter = [
        'none', 'grayscale', 'oceanic', 'island', 'marine', 'seagreen',
        'flagblue', 'liquid', 'diamante', 'radio', 'twenties',
        'rosetint', 'mauve', 'bluechrome', 'vintage', 'perfume', 'sereniry'
    ];

    function handleList(event, index, value) {
        setIndex(index);
        filter(value);
        filterValue.index = index;
        filterValue.filter = value;
    }
    return (
        <List>
            {listFilter.map((value, indexList) => {
                return (
                    <ListItemButton key={indexList} selected={index === indexList} onClick={event => handleList(event, indexList, value)}>
                        <ListItemText primary={value.replace(/^\w/, (c) => c.toUpperCase())} />
                    </ListItemButton>
                );
            })}
        </List>
    );
}

export default Filter;