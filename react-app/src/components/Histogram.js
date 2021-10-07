import React, { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";
import { pixel } from '../lib/wasm';

const Histogram = () => {

    // const data = [100, 110, 120, 110, 100, 120, 130, 120, 130, 100];
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 360 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    const [data] = useState(pixel.red.frequency);

    const svgref = useRef();
    // const inputRef = useRef();

    const drawSvg = () => {
        const svg = d3.select(svgref.current)
            .append("svg")
            .attr("width", width + margin.left +margin.right)
            .attr("height", height + margin.top + margin.bottom + 10)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.right})`);
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => { return +d })])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, 250]);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));


        // Y axis: initialization
        const y = d3.scaleLinear()
            .range([height, 0]);
        const yAxis = svg.append("g");

        function update(nBin) {

            // set the parameters for the histogram
            const histogram = d3.bin()
                .value(function (d) { return d; })   // I need to give the vector of value
                .domain(x.domain())  // then the domain of the graphic
                .thresholds(x.ticks(nBin)); // then the numbers of bins

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
                .style("fill", "#69b3a2")

        }
        update(10);
    }

    useEffect(() => {
        drawSvg();
    }, [])


    return (
        <div >
            <div className="svg" ref={svgref}></div>
            {/* <input ></input> */}
        </div>
    );
}

export default Histogram;