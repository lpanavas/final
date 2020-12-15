import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Menu, Button } from "antd";

import { HomeOutlined, ReadOutlined } from "@ant-design/icons";
import "./navBar.css";
import "antd/dist/antd.css";

const NavBar = ({ user }) => {
  return (
    <Row>
      <Col sm={14} md={10} lg={8} xl={6}>
        <div
          className="brand"
          style={{
            fontSize: "22px",
            fontFamily: "Impact",
            color: "white",
          }}
        >
          <img
            src="https://res.cloudinary.com/dk4w6vkbg/image/upload/v1607899786/craiglist/house_ravgbp.jpg"
            alt="icon"
            style={{
              width: "2rem",
              marginRight: "10px",
            }}
          />
          CRAIGCLONE
        </div>
      </Col>

      {/* Menu */}
      <Col sm={2} md={3} lg={5} xl={6}>
        {/* <Menu theme="dark" mode="horizontal"> */}
        <Menu theme="dark" mode="horizontal" style={{ background: "#fcaf58" }}>
          <Menu.Item key="1" className="select">
            <HomeOutlined />
            <span>
              <NavLink to="/home">Home</NavLink>
            </span>
          </Menu.Item>
          <Menu.Item key="2" className="select">
            <ReadOutlined />
            <span>
              <NavLink to="/Following">My Following</NavLink>
            </span>
          </Menu.Item>
          {/* <Menu.Item key="3">
            <AboutModal />
          </Menu.Item> */}
        </Menu>
      </Col>

      <Col sm={0} md={8} xl={6}>
        <div></div>
      </Col>
      {/* search bar */}
      <Col sm={8} md={5} xl={4}>
        <Button
          onClick={() => {
            fetch(`auth/logout`, {
              method: "POST",
            });
            window.location.href = "/";
          }}
          ghost
        >
          {" "}
          Log Out
        </Button>
      </Col>
    </Row>
  );
};
export default NavBar;
