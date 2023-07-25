import Carousel from 'react-bootstrap/Carousel';
import './CarouselStyle.css';

const CarouselSection = () => {
  return (
    <div className='carouselContainer'
      data-aos="zoom-out"
      data-aos-offset="100"
      data-aos-delay="0"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="false"
      data-aos-once="true">
      <div id='carousel-section'>
          <Carousel fade slide={false} pause={false}>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/eight.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/five.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
              <img
              className="d-block w-100 images-size"
              src="images/eleven.jpg"
              alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/nine.jpg"
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/ten.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/14.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/12.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2500}>
                <img
                className="d-block w-100 images-size"
                src="images/13.jpg"
                alt="Third slide"
                />
            </Carousel.Item>
          </Carousel>
      </div>
    </div>
  );
}

export default CarouselSection;