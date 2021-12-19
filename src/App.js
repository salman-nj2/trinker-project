import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import stockData from "./data.json";
import Stocks from "./components/Stocks";

function App() {
  return (
    <div className="App">
      <SearchBar placeholder="Search and add stocks..." data={stockData} />
      <Stocks />
    </div>
  );
}

export default App;
