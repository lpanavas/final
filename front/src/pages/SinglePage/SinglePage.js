import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { getImageUrl, imageSize } from "../imageProcessing";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./singlePage.css";
import { UserAddOutlined, HighlightOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "antd";
import NavBar from "../../components/navBar";

const { Header, Content } = Layout;

const SinglePage = (props) => {
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);

  const [anno, setAnno] = useState([]);

  const fetchAnno = async () => {
    const annoResp = await fetch(
      `/posts/getAnnotations?postId=${encodeURIComponent(
        houseId
      )}&username=${encodeURIComponent(props.user)}`
    );
    const annoRespJson = await annoResp.json();

    setAnno(annoRespJson);
  };

  const fetchHouse = async (houseId) => {
    const houseResp = await fetch(`/posts/getContent/${houseId}`);
    const houseRespJson = await houseResp.json();
    setHouse(houseRespJson["house"]);
  };

  useEffect(() => {
    fetchHouse(houseId);
    fetchAnno();
  }, [anno]);

  if (house) {
    return (
      <Layout>
        <Header style={{ background: "#fcaf58" }}>
          <NavBar user={props.user} />
        </Header>
        <Content>
          <Container>
            <Row className="justify-content-center">
              <h1 className="post-title">
                {house["title"]} - ${house["price"]}/month{" "}
              </h1>

              <Col xs={6}>
                <div className="image-carousel__outer">
                  <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                  >
                    {house["images"].map((img, idx) => (
                      <img
                        key={idx.toString()}
                        src={getImageUrl(img, imageSize.MEDIUM)}
                        alt=""
                      />
                    ))}
                  </Carousel>

                  <Row>
                    <Col xs={12}>
                      <form action="/posts/addAnnotations" method="POST">
                        <div className="form-group">
                          <label for="inputComment">
                            Write down your note for this:
                          </label>
                          <input
                            type="text"
                            id="comment"
                            className="form-control"
                            placeholder=" "
                            name="comment"
                          />
                          <input
                            type="hidden"
                            name="postId"
                            value={houseId}
                            id="postId"
                          />
                          <input
                            type="hidden"
                            name="username"
                            value={props.user}
                            id="username"
                          />
                        </div>

                        <button type="submit" className="btn btn-dark">
                          <HighlightOutlined /> Write
                        </button>
                        <div className="comments">
                          {anno.map((singleanno, idx) => (
                            <div>
                              {singleanno["comment"]} is written by you at
                              &nbsp;
                              {singleanno["time"]}{" "}
                            </div>
                          ))}
                        </div>
                      </form>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      {" "}
                      <form action="/users/updateFollowing" method="post">
                        <input
                          type="hidden"
                          name="username"
                          id={props.user}
                          value={props.user}
                        />
                        <input
                          type="hidden"
                          name="following"
                          id={house["author"]}
                          value={house["author"]}
                        />
                        <button
                          type="submit"
                          className="btn btn-dark"
                          style={{}}
                        >
                          <UserAddOutlined /> Follow the author{" "}
                          {house["author"]}
                        </button>
                      </form>
                    </Col>
                  </Row>

                  <div className="postingbody">{house["body"]}</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Content>
      </Layout>
    );
  } else {
    return <main></main>;
  }
};

export default SinglePage;
