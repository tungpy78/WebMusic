import { useEffect, useState } from "react"
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getRecommendedSongs } from "../../Services/recomandation.service";
import { Song } from "../../models/song.model";

function HintMusic(){
    const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([])
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getRecommendedSongs();
                setRecommendedSongs(response.data.slice(0, 6)); // Lấy 6 bài hát gợi ý
            } catch (error) {
                console.error("Error fetching recommended songs:", error);
            }
        }
        fetchApi();
    },[])
    console.log("recommendedSongs",recommendedSongs);
    return (
        <>
        <h2>Gợi ý cho bạn</h2>
        <div className="inner__list">
            {recommendedSongs.map((item) => (
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
    )
}
export default HintMusic
