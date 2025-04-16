import { Carousel } from "antd";
import "../../assets/scss/dashboard.scss";

function CarouselImage(){
    return(
        <>
            <Carousel arrows infinite autoplay className="carousel__list">
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
            </div>
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
            </div>
            <div className="carousel__item">
                <div className="carousel__image-wrapper">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
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