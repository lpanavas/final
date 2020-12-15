import React from "react";
import { Card, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Meta } = Card;

const HouseListPage = () => {
  return (
    <div>
      <Row>
        <Col className="card-list" sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                src="https://images.craigslist.org/00303_a6CwsRrtefj_0CI0t2_300x300.jpg"
                alt=""
              />
            }
          >
            <Meta
              title={"xxx"}
              description={
                <span>
                  by: {"props.post.author"}
                  address:
                  {"props.post.address"}
                  price:
                  {"displayPrice"}
                </span>
              }
            />
          </Card>
        </Col>
        <Col className="card-list" sm={12} md={8} lg={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                src="https://images.craigslist.org/00303_a6CwsRrtefj_0CI0t2_300x300.jpg"
                alt=""
              />
            }
          >
            <Meta
              title={"xxx"}
              description={
                <span>
                  by: {"props.post.author"}
                  address:
                  {"props.post.address"}
                  price:
                  {"displayPrice"}
                </span>
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HouseListPage;
