import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "./homePage.css";
import { Icon } from "semantic-ui-react";
import SelectSearch from "react-select-search";
const HomePage = () => {
  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];
  const [roomNum, setBedrooms] = useState("1");
  const [minArea, setMinArea] = useState("---");
  const [maxArea, setMaxArea] = useState("---");
  const [minPrice, setMinPrice] = useState("---");
  const [maxPrice, setMaxPrice] = useState("---");
  // const roomNumRef = useRef();
  // const minPriceRef = useRef();
  // const maxPriceRef = useRef();
  const history = useHistory();

  const handleFilter = () => {
    let minIntPrice;
    let maxIntPrice;
    let minIntArea;
    let maxIntArea;
    if (minArea === "---") {
      minIntArea = 0;
    } else {
      minIntArea = parseInt(minArea.substring(0, minArea.length - 2));
    }

    if (minArea === "---") {
      maxIntArea = 9999999;
    } else {
      maxIntArea = parseInt(maxArea.substring(0, maxArea.length - 2));
    }

    if (minPrice === "---") {
      minIntPrice = 0;
    } else {
      minIntPrice = parseInt(minPrice.substring(1));
    }

    if (maxPrice === "---") {
      maxIntPrice = 9999999;
    } else {
      maxIntPrice = parseInt(maxPrice.substring(1));
    }

    const queryObj = {
      rooms: roomNum,
      minPrice: minIntPrice,
      maxPrice: maxIntPrice,
      page: 1,
    };
    const url =
      "/posts?" +
      Object.keys(queryObj)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(queryObj[key])
        )
        .join("&");

    history.push(url);
  };

  return (
    <div class="search">
      <div>
        <Icon name="search" size="large" />
      </div>
      <form>
        <div class="row">
          <div class="option">
            <select
              placeholder="# of Bedrooms "
              name="bedrooms"
              onChange={(evt) => setBedrooms(evt.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div class="option">
            <select
              placeholder="Min Price "
              name="minprice"
              onChange={(evt) => setMinPrice(evt.target.value)}
            >
              <option>$0</option>
              <option>$100</option>
              <option>$500</option>
              <option>$700</option>
            </select>
          </div>
          <div class="option">
            <select
              placeholder="Max Price "
              name="maxprice"
              onChange={(evt) => setMaxPrice(evt.target.value)}
            >
              <option>$0</option>
              <option>$100</option>
              <option>$500</option>
              <option>$700</option>
            </select>
            <div class="option">
              <select
                placeholder="Min Area "
                name="minarea"
                onChange={(evt) => setMinArea(evt.target.value)}
              >
                <option>---</option>
                <option>100ft</option>
                <option>400ft</option>
                <option>700ft</option>
                <option>1000ft</option>
                <option>1300ft</option>
                <option>1600ft</option>
              </select>
            </div>
            <div class="option">
              <select
                placeholder="Max Area "
                name="maxarea"
                onChange={(evt) => setMaxArea(evt.target.value)}
              >
                <option>400ft</option>
                <option>100ft</option>
                <option>600ft</option>
                <option>700ft</option>
                <option>800ft</option>
                <option>1300ft</option>
                <option>900ft</option>
              </select>
            </div>
          </div>
          <Button variant="primary" onClick={handleFilter}>
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
