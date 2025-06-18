import { Carousel } from "antd";
import "../../assets/scss/dashboard.scss";
import { useEffect, useState } from "react";
import { Song } from "../../models/song.model";
import { getAllSong } from "../../Services/song.service";
import { Link } from "react-router-dom";

function CarouselImage(){
    const [dataSong, setDataSong] = useState<Song[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getAllSong();
                setDataSong(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, []);
    console.log("datasong", dataSong);
    return(
        <>
            <Carousel dots={false} arrows infinite autoplay className="carousel__list">
                {dataSong.map((song) => (
                    <Link to={`/song/${song._id}`}  key={song._id}>
                        <div className="carousel__item">
                            <div className="carousel__image-wrapper">
                                <img src={song.avatar} alt={song.title} />
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </>
    )
}
export default CarouselImage;