import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import "../../assets/scss/dashboard.scss";
import { Carousel } from "antd";
function Dashboard(){
    return (
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

        <h2>Gợi ý cho bạn</h2>

        <div className="inner__list">
            <div className="inner__item">
                <div className="inner__item--image">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
                <div className="inner__item--title">
                    <h4>Tùng Dương</h4>
                    <p>Tái Sinh</p>
                </div>
                <div className="play-button">
                        <PlayCircleOutlined />
                    </div>
                <div className="favorite-button ">
                        <HeartOutlined />
                </div>
            </div>
            <div className="inner__item">
                <div className="inner__item--image">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
                <div className="inner__item--title">
                    <h4>Tùng Dương</h4>
                    <p>Tái Sinh</p>
                </div>
                <div className="play-button">
                    <PlayCircleOutlined />
                </div>
                <div className="favorite-button ">
                    <HeartOutlined />
                </div>
            </div>
            <div className="inner__item">
                <div className="inner__item--image">
                    <img src="https://index.vn/uploads/news/1735100496_loi-bai-hat-tai-sinh.jpg" alt="poster" />
                </div>
                <div className="inner__item--title">
                    <h4>Tùng Dương</h4>
                    <p>Tái Sinh</p>
                </div>
                <div className="play-button">
                    <PlayCircleOutlined />
                </div>
                <div className="favorite-button ">
                    <HeartOutlined />
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard;