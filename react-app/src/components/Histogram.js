import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import { pixel, bins, histogramEqualize } from '../lib/wasm';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const Histogram = () => {

    const [data, setData] = useState(pixel.red.frequency);
    const [inputValue, setInputValue] = useState(bins.bin);
    const [currentColor, setCurrentColor] = useState(bins.current);
    const [svgValue, setSvgValue] = useState({ svg: null, x: null, y: null, yAxis: null });
    const margin = { top: 10, right: 30, bottom: 30, left: 50 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const svgref = useRef();
    const inputRef = useRef();

    const didMount = React.useRef(false);

    useEffect(() => {
        if (didMount.current) {
            update(svgValue.svg, svgValue.x, svgValue.y, svgValue.yAxis, bins.bin);
        } else {
            didMount.current = true;
        }
    },
        // eslint-disable-next-line
        [data, currentColor]);

    const [color, setColor] = useState(currentColor !== 'grey' ? [
        { value: 'red' },
        { value: 'green' },
        { value: 'blue' },
    ] : [{ value: 'grey' }]);

    function handleRadio(event) {
        const value = event.target.value;

        if (value === "grey") {
            setCurrentColor('gray');
            setColor([{ value: 'grey' }])
            setData(pixel['red'].frequency);
        } else {
            setColor([
                { value: 'red' },
                { value: 'green' },
                { value: 'blue' },
            ])
            setCurrentColor(value);
            setData(pixel[value].frequency);
        }
        bins.current = value;
    }

    function changeBin(event) {
        const nBin = event.target.value;

        update(svgValue.svg, svgValue.x, svgValue.y, svgValue.yAxis, nBin);
        setInputValue(nBin);
        bins.bin = nBin;
    }
    function update(svg, x, y, yAxis, nBin) {

        const [min, max] = d3.extent(data);
        const threshold = d3.range(min, max, (max - min) / nBin);

        // set the parameters for the histogram
        const histogram = d3.bin()
            .value(function (d) { return d; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(threshold); // then the numbers of bins

        // And apply this function to data to get the bins
        const bins = histogram(data);

        // Y axis: update now that we know the domain
        y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        yAxis
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Join the rect with the bins data
        const u = svg.selectAll("rect")
            .data(bins)

        // Manage the existing bars and eventually the new ones:
        u
            .join("rect") // Add a new rect for each new elements
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("x", 1)
            .attr("transform", function (d) { return `translate(${x(d.x0)}, ${y(d.length)})` })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function (d) { return height - y(d.length); })
            .style("fill", currentColor);

    }

    const drawSvg = () => {
        const svg = d3.select(svgref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom + 10)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.right})`);
        const x = d3.scaleLinear()
            .domain([0, 255])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, width]);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Y axis: initialization
        const y = d3.scaleLinear()
            .range([height, 0]);
        const yAxis = svg.append("g");

        update(svg, x, y, yAxis, inputValue);
        setSvgValue({ svg: svg, x: x, y: y, yAxis: yAxis });
    }

    useEffect(() => {
        drawSvg();
    },
        // eslint-disable-next-line
        []);
    function equalize() {
        histogramEqualize();

        setColor([{ value: 'grey' }])
        setData(pixel['red'].frequency);
        setCurrentColor('grey');
    }
    return (
        <div >
            <RadioButton key="radio" color={color} onChange={handleRadio} currentColor={currentColor} />
            <div className="svg" ref={svgref}></div>
            <Input type="number" ref={inputRef} value={inputValue} onChange={changeBin} max="256"></Input>
            <Button onClick={equalize}>Equalize Histogram</Button>
        </div>
    );
}

const RadioButton = (props) => {

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Histogram Colour</FormLabel>
            <RadioGroup onChange={props.onChange} value={props.currentColor} row aria-label="colour" name="radio-color">
                {props.color.map(v => {
                    return (<FormControlLabel key={v.value} value={v.value} label={(v.value === 'grey' ? `${v.value}scale` : v.value).replace(/^\w/, (c) => c.toUpperCase())} control={<Radio key={props.value} size="small" />} />);
                })}
            </RadioGroup>
        </FormControl>
    )
}

export default Histogram;