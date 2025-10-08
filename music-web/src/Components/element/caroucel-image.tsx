import Slider from "react-slick";
import { Song } from "../../models/song.model";
import { Link } from "react-router-dom";
import "../../assets/scss/dashboard.scss";
// Import CSS cho slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PlayCircleOutlined } from "@ant-design/icons";

// --- THAY ĐỔI 1: Định nghĩa props để nhận dữ liệu từ bên ngoài ---
interface CarouselImageProps {
    songs: Song[];
}

/**
 * Component này giờ đây chỉ chịu trách nhiệm hiển thị một danh sách bài hát
 * dưới dạng carousel. Nó có thể được tái sử dụng ở bất cứ đâu.
 */
function CarouselImage({ songs }: CarouselImageProps) {
    // --- THAY ĐỔI 2: Xóa bỏ useEffect và useState gọi API ---
    // Component không còn tự lấy dữ liệu nữa.

    const settings = {
        dots: false,
        infinite: songs.length > 5, // Chỉ lặp vô hạn nếu có nhiều hơn 5 bài
        speed: 4000,
        slidesToShow: 5, // Hiển thị 5 bài trên màn hình lớn
        slidesToScroll: 2,
        autoplay: true,
        arrows: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1, centerMode: true, centerPadding: "40px" } }
        ]
    };

    // Không hiển thị gì nếu không có bài hát
    if (!songs || songs.length === 0) {
        return null;
    }

    return (
        <>
        <div className="carousel__container related-songs-carousel">
            <Slider {...settings}>
                {/* --- THAY ĐỔI 3: Dùng `songs` từ props thay vì `dataSong` --- */}
                {songs.map((song) => (
                    <div key={song._id} className="carousel__slide-item" style={{ padding: "0 10px" }}>
                        <Link to={`/song/${song._id}`}>
                            <div className="carousel__item">
                                <div className="carousel__image-wrapper">
                                    <img src={song.avatar} alt={song.title} />
                                </div>
                                <div style={{ marginTop: '12px', textAlign: 'left' }}>
                                    <h4 style={{ color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {song.title}
                                    </h4>
                                    <Link to={`/artist/${song.artist[0]?._id}`} style={{ color: 'gray', textDecoration: 'none' }}>
                                        <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {song.artist.map((artist, index) => (
                                                <span key={artist._id}>
                                                    {artist.name}
                                                    {index < song.artist.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
        <h2>Gợi ý cho bạn</h2>
        <div className="inner__list">
            {songs.map((item) => (
                <Link to={`/song/${item._id}`} className="inner__item" style={{ textDecoration: 'none', color: 'inherit' }} key={item._id}>
                    <div className="inner__item--image">
                        <img src={item.avatar} alt={item.title} />
                    </div>
                    <div className="inner__item--title">
                        <h4>{item.title}</h4>
                        <p>
                        {item.artist.map((artist, index) => (
                            <span key={artist._id}>
                                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
                                {index < item.artist.length - 1 && ", "}
                            </span>
                        ))}
                        </p>
                    </div>
                    <div className="play-button">
                        <PlayCircleOutlined />
                    </div>
                </Link>
            ))}
        </div>
        </>
        
    );
}

export default CarouselImage;
