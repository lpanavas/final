import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "antd";
import NavBar from "../../components/navBar";

const { Header, Content } = Layout;

const FollowingPage = (props) => {
  const [following, setFollowing] = useState([]);

  const fetchFollowing = async () => {
    const followingResp = await fetch(
      `/users/userFollwing?username=${encodeURIComponent(props.user)}`
    );

    const followingRespJson = await followingResp.json();
    setFollowing(followingRespJson["following"]);
  };

  useEffect(() => {
    fetchFollowing();
  }, [following]);

  return (
    <Layout>
      <Header style={{ background: "#fcaf58" }}>
        <NavBar user={props.user} />
      </Header>
      <Content>
        <Container>
          <div
            style={{
              display: "inline-grid",
              gridTemplateColumns: "auto auto auto auto",
              gridGap: "10px",
              marginTop: "10px",
            }}
          >
            {following.map((author, idx) => (
              <div style={{ width: "300px" }}>
                <a href={"/author/" + author}>
                  👉 Click to See {author} Posts 👈
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Content>
    </Layout>
  );
};

export default FollowingPage;
