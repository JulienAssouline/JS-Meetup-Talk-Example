import React, { useEffect, useRef } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { axisLeft, axisBottom } from "d3-axis";
import { select } from "d3-selection";
import { w, h, width, height, margin, xtickFormat } from "./utils/chart_utils";
import "./App.css";

function BarChart(props) {
  const { data } = props;

  const ref = useRef(null);

  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.volume)])
    .range([height, 0]);

  const xAxis = axisBottom()
    .scale(xScale)
    .tickSizeOuter(0);

  const yAxis = axisLeft()
    .scale(yScale)
    .tickSizeOuter(0);

  useEffect(() => {
    select(ref.current)
      .append("g")
      .attr("class", "x-axis bar")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .text(d => `${xtickFormat[d.getMonth()]} '${d.getYear() - 100}`);

    select(ref.current)
      .append("g")
      .attr("class", "y-axis bar")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
      .selectAll("text")
      .text(d => `${d / 1000000}M`);
  }, [yAxis, xAxis]);

  const rects = data.map((d, i) => (
    <rect
      key={`rect${i}`}
      x={xScale(d.date)}
      y={yScale(d.volume)}
      width={width / data.length - 1}
      height={height - yScale(d.volume)}
      style={{ fill: "#ffab00" }}
    />
  ));

  return (
    <div className="line-chart">
      <h1> Volume </h1>
      <svg width={w} height={h}>
        <g ref={ref} transform={`translate(${margin.left},${margin.top})`}>
          {rects}
        </g>
      </svg>
    </div>
  );
}

export default BarChart;
