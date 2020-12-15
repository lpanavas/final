import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import unavailableImg from "../images/unavailable-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faBed,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/HouseCard.css";

const HouseCard = ({ house }) => {
          const displayPrice = house.price ? `$${house.price}` : "$0";

        return (
            <div className="post-card" data-test="post-card">
                <Link href={`/content/${house['_id']}`}>
                    <div
                        className="image"
                        style={{
                            backgroundImage: `url(${getImageUrl(
                                props.post.images[0],
                                imageSize.MEDIUM
                            )})`,
                        }}
                    ></div>
                    <div className="post-card-infos">
                        <h2>{house["title"]}</h2>
                        <div className="post-card-infos--secondary">
                            <p>{house["address"]}</p>
                            <p className="post-card-pricing">{displayPrice}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );}

  return (
    <Col x2={6} sm={4}>
      <Card style={{ width: "16rem" }} className="m-3">
        <Card.Img
          variant="top"
          src={parseImgUrl(house["images"])}
          onError={(evt) => {
            evt.target.onerror = null;
            evt.target.src = unavailableImg;
          }}
          className="card-img"
        />
        <Card.Body>
          <Card.Link href={`/house-detail/${house["_id"]}`}>
            {house["result-title"]}
          </Card.Link>
          <Card.Text>
            <FontAwesomeIcon icon={faDollarSign} /> {house["result-price"]}
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faBed} /> {house["bedrooms"]}
          </Card.Text>
          <Card.Text>
            <FontAwesomeIcon icon={faWarehouse} /> {house["area"]} ft
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

HouseCard.propTypes = {
  house: PropTypes.object.isRequired,
};

export default HouseCard;
