import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [watchData, setwatchData] = useState([]);
  const [hover, setHover] = useState(-1);
  const [checked, setChecked] = useState();
  const [add, setAdd] = useState(false);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value[0]
        .split("::")[0]
        .toUpperCase()
        .includes(searchWord.toUpperCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const percentage = (num) => {
    return (((num[1] - num[2]) * 100) / num[2]).toFixed(2);
  };
  const handleClick = async (e) => {
    const payload = {
      name: e[0].split("::")[0],
      type: e[0].split("::")[1],
      value: e[1],
      percent: percentage(e),
    };

    let response = await axios.post("http://localhost:5000/stocks", payload);
    //console.log(e);
    setwatchData(response);
  };

  useEffect(() => {
    checkData();
  }, [checked]);

  const checkData = async () => {
    let response = await axios.get("http://localhost:5000/stocks");
    setChecked(response.data);
  };
  const handleChecked = (val) => {
    let z = val[0].split("::")[0];
    if (check(z, checked)) {
      setAdd(true);
    }
  };
  console.log("ckec", checked, add);
  function check(val, arr) {
    for (let key of arr) {
      if (key.name === val) {
        return true;
      }
    }
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <TextField
          id="outlined-name"
          label="Search"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, i) => (
            <div
              className="search-details"
              key={i}
              onMouseEnter={() => {
                handleChecked(value);
                setHover(i);
              }}
              onMouseLeave={() => {
                setAdd(false);
                setHover(-1);
              }}
            >
              <div>
                <p className={percentage(value) < 0 ? "red" : "green"}>
                  {value[0].split("::")[0]}
                </p>
                <div>
                  <p>{value[0].split("::")[1]}</p>
                </div>
              </div>
              <div>
                <p className={percentage(value) < 0 ? "red" : "green"}>
                  {value[1]}
                </p>

                {percentage(value) < 0 ? (
                  <p>
                    <img src="./red.png" alt="k" className="down-red" />
                    {percentage(value) + "%"}
                  </p>
                ) : (
                  <p>
                    <img
                      src="./green.png"
                      alt="up-green"
                      className="up-green"
                    />
                    {percentage(value) + "%"}
                  </p>
                )}
              </div>
              <div className={hover === i ? "show" : "hidden"}>
                {add !== true ? (
                  <div>
                    <AddIcon onClick={() => handleClick(value)} />
                  </div>
                ) : (
                  <div>
                    <BookmarkIcon />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
