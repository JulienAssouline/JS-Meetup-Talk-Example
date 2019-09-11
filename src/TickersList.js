import React, { useState } from "react";
import "./App.css";
import AddTicker from "./AddTicker";

function TickersList(props) {
  const [ticker, setTicker] = useState([
    { name: "TSLA" },
    { name: "CGC" },
    { name: "SHOP" },
    { name: "AAPL" },
    { name: "FB" }
  ]);

  function addTicker(value) {
    setTicker(value);
  }

  if (ticker.length === 0)
    return <AddTicker data={ticker} addTicker={addTicker} />;

  function handleClick(index, name) {
    props.history.push({
      pathname: `/ticker${index}`,
      state: { ticker: name }
    });
  }

  return (
    <div className="add-ticker">
      {ticker.map((d, index) => (
        <div key={index}>
          <p
            className={"ticker-name"}
            onClick={() => handleClick(index, d.name)}
          >
            {d.name.toUpperCase()}
          </p>
        </div>
      ))}
      <AddTicker data={ticker} addTicker={addTicker} />
    </div>
  );
}

export default TickersList;
