import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { useParams } from "react-router-dom";

import { Container, Row } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "antd";

const { Header, Content } = Layout;

const AuthorPage = () => {
  const { author } = useParams();
  const [posts, setPosts] = useState(null);

  const fetchPosts = async (author) => {
    console.log(author);
    const houseResp = await fetch("/posts/getList/" + author);
    const houseRespJson = await houseResp.json();
    setPosts(houseRespJson);
  };

  useEffect(() => {
    fetchPosts(author);
  }, []);

  if (posts) {
    return (
      <Layout>
        <Header style={{ background: "#fcaf58" }}>
          <NavBar />
        </Header>
        <Content>
          <Container>
            <Row className="justify-content-center">
              <h1 className="post-title">
                {posts.map((post, idx) => (
                  <div>
                    <a href={"/getContent/" + post["id"]}>
                      👉 Click to See {post["title"]}👈
                    </a>
                  </div>
                ))}
              </h1>
            </Row>
          </Container>
        </Content>
      </Layout>
    );
  } else {
    return <main></main>;
  }
};

export default AuthorPage;
