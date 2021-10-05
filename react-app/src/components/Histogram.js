import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { pixel } from '../lib/wasm';

const Histogram = () => {

    // const [data] = useState(pixel.red.frequency);
    const [data] = useState([100, 200, 200, 300, 300, 300, 400, 400, 400, 400]);

    const svgref = useRef();
    const inputRef = useRef();

    // function update(nBin) {
    //     const histogram = d3.bin()
    //         .value((d) => {return })
    // }

    useEffect(() => {

        const margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg.append('g')
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X Axis scale and draw:
        const x = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width]);

        svg.append('g')
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Y Axis Init:
        const y = d3.scaleLinear()
            .range([height, 0]);
        const yAxis = svg.append('g');




        // // Setting up svg container 
        // const w = 256;
        // const h = 316;

        // const svg = d3.select(svgref.current)
        //     .attr('width', w)
        //     .attr('height', h)
        //     .style('overflow', 'visible')
        //     .style('padding-left', '20px');

        // // Setting the scale
        // const xScale = d3.scaleBand()
        //     .domain(data.map((val, i) => i))
        //     .range([0, w])
        //     .padding(0.5);
        // const yScale = d3.scaleLinear()
        //     .domain([0, h])
        //     .range([h, 0]);

        // // Setting the axis
        // const xAxis = d3.axisBottom(xScale)
        //     .ticks(data.length);
        // const yAxis = d3.axisLeft(yScale)
        //     .ticks(5);

        // svg.append('g')
        //     .call(xAxis)
        //     .attr('transform', `translate(0, ${h})`);
        // svg.append('g')
        //     .call(yAxis);

        // // Setting the bar
        // svg.selectAll('.bar')
        //     .data(data)
        //     .join('rect')
        //     .attr('x', (y, i) => xScale(i))
        //     .attr('y', yScale)
        //     .attr('width', xScale.bandwidth())
        //     .attr('height', val => h - yScale(val))
        //     .attr('fill', 'red');


    }, [data]);


    return (
        <div>
            <svg ref={svgref}></svg>
            <input ref={inputRef} type="number" min="1" max="255" value="30" id="nBin"/>
        </div>
    );
}

export default Histogram;