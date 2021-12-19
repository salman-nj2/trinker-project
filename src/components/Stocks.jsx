import { useState, useEffect } from "react";
import axios from "axios";
import styled from "./Styles/Stocks.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function Stocks() {
  const [data, setData] = useState([]);
  const [nameData, setnameData] = useState("Your Watchlist");
  const [hover, setHover] = useState(-1);

  const getData = async () => {
    let response = await axios.get("/stocks");
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, [data]);

  const handleDelete = async (id) => {
    await axios.delete(`/stocks/${id}`);
    const delData = data.filter((item) => item.id !== id);
    setData(delData);
  };
  //console.log(data);

  return (
    <div>
      <div className={styled.stockDetails}>
        <div className={styled.nameDetail}>
          <div contentEditable="true">{nameData}</div>
          <div>
            <EditIcon />
            <DeleteOutlineOutlinedIcon />
          </div>
        </div>
        {data.map((value, i) => (
          <div
            className="search-details"
            key={i}
            onMouseEnter={() => {
              setHover(i);
            }}
            onMouseLeave={() => {
              setHover(-1);
            }}
          >
            <div>
              <p className={value.percent < 0 ? "red" : "green"}>
                {value.name}
              </p>
              <div>
                <p>{value.type}</p>
              </div>
            </div>
            <div>
              <p className={value.percent < 0 ? "red" : "green"}>
                {value.value}
              </p>

              {value.percent < 0 ? (
                <p>
                  <img src="./red.png" alt="k" className="down-red" />
                  {value.percent + "%"}
                </p>
              ) : (
                <p>
                  <img src="./green.png" alt="up-green" className="up-green" />
                  {value.percent + "%"}
                </p>
              )}
            </div>
            <div className={hover === i ? styled.show : styled.hidden}>
              <div>
                <ShowChartIcon />
              </div>
              <div>B</div>
              <div>S</div>
              <div>
                <DeleteOutlineOutlinedIcon
                  onClick={(e) => handleDelete(value.id)}
                />
              </div>
              <div>
                <InfoOutlinedIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stocks;
