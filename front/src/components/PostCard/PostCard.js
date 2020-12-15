import React from "react";
import { Card, Col } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./postCard.css";
import { getImageUrl, imageSize } from "../imageProcessing";

const { Meta } = Card;

const PostCard = (props) => {
    const displayPrice = props.post.price ? `$${props.post.price}` : "$0";
    const imageUrl = getImageUrl(props.post.images[0], imageSize.MEDIUM);
    return (
        <Col className="card-list" sm={12} md={8} lg={6}>
            <Link to={"/getContent/" + props.post._id} key={props.post._id}>
                <Card
                    hoverable
                    style={{ overflow: "hidden" }}
                    cover={<img src={imageUrl} alt="" />}
                    size="small"
                >
                    <Meta
                        title={props.post.title}
                        description={
                            <span>
                                by: {props.post.author}
                                <br />
                                <span>
                                    address:
                                    {props.post.address}
                                </span>
                                <br />
                                <span>
                                    price:
                                    {displayPrice}
                                </span>
                            </span>
                        }
                    />
                </Card>
            </Link>
        </Col>
    );
};

export default PostCard;
