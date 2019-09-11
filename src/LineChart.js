import React, { useEffect, useRef } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { axisLeft, axisBottom } from "d3-axis";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { w, h, width, height, margin, xtickFormat } from "./utils/chart_utils";
import "./App.css";

function LineChart(props) {
  const { data } = props;

  const ref = useRef(null);

  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.close))
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
      .attr("class", "x-axis line")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .text(d => `${xtickFormat[d.getMonth()]} '${d.getYear() - 100}`);

    select(ref.current)
      .append("g")
      .attr("class", "y-axis line")
      .attr("transform", "translate(0,0)")
      .call(yAxis);
  }, [yAxis, xAxis]);

  const path = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.close));

  return (
    <div className="line-chart">
      <svg width={w} height={h}>
        <g ref={ref} transform={`translate(${margin.left},${margin.top})`}>
          <path
            d={path(data)}
            style={{ fill: "none", stroke: "#ffab00", strokeWidth: 3 }}
          />
        </g>
      </svg>
    </div>
  );
}

export default LineChart;
