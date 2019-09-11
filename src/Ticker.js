import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { timeParse } from "d3-time-format";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import token from "./utils/Token";

function Ticker(props) {
  const [data, setData] = useState([]);

  const ticker = props.location.state.ticker;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/1y?token=${token}`
      );
      setData(result.data);
    };

    fetchData();
  }, [ticker]);

  const parseTime = timeParse("%Y-%m-%d");

  data.forEach(d => {
    d.date = parseTime(d.date);
  });

  return (
    <div className="ticker-page">
      <h1> {ticker} </h1>
      <p> 1 year stock price </p>
      <LineChart data={data} />
      <BarChart data={data} />
    </div>
  );
}

export default Ticker;
