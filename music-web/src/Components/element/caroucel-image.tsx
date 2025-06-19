import Slider from "react-slick";   
import { useEffect, useState } from "react";
import { Song } from "../../models/song.model";
import { getAllSong } from "../../Services/song.service";
import { Link } from "react-router-dom";
import "../../assets/scss/dashboard.scss";

function CarouselImage() {
    const [dataSong, setDataSong] = useState<Song[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getAllSong();
                setDataSong(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    const settings = {
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 3,
        infinite: true,
        autoplay: true,
        speed: 500,
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "40px",
                }
            }
        ]
    };

    return (
        <div className="carousel__container">
            <Slider {...settings}>
                {dataSong.map((song) => (
                    <Link to={`/song/${song._id}`} key={song._id}>
                        <div className="carousel__item">
                            <div className="carousel__image-wrapper">
                                <img src={song.avatar} alt={song.title} />
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

export default CarouselImage;
