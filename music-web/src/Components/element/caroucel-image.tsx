import { Carousel } from "antd";
import "../../assets/scss/dashboard.scss";

function CarouselImage(){
    return(
        <>
            <Carousel arrows infinite autoplay className="carousel__list">
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2025/03/04/f/f/6/2/1741055268047_org.jpg" alt="poster" />
                </div>
            </div>
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2025/04/16/1/6/d/f/1744771524665_org.jpg" alt="poster" />
                </div>
            </div>
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://avatar-ex-swe.nixcdn.com/slideshow/2025/04/10/1/e/7/4/1744259159177_org.jpg" alt="poster" />
                </div>
            </div>
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
            </div>
            </Carousel>
        </>
    )
}
export default CarouselImage;