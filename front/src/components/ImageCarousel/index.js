import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
import { getImageUrl, imageSize } from "../imageProcessing";

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.images,
        };
    }

    renderImages = () => {
        if (this.props.images) {
            return this.props.images.map((image, i) => {
                return (
                    <div key={`${image}-${i}`}>
                        <img
                            src={getImageUrl(image, imageSize.MEDIUM)}
                            alt=""
                        />
                    </div>
                );
            });
        }
    };

    render() {
        return (
            <div className="image-carousel__outer">
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                >
                    {this.renderImages()}
                </Carousel>
            </div>
        );
    }
}

ImageCarousel.propTypes = {
    postImages: PropTypes.array,
};

export default ImageCarousel;
