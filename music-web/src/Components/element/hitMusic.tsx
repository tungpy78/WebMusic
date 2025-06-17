import { useEffect, useState } from "react"
import { getHistory } from "../../Services/history.service";
import { History } from "../../models/history.model";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function HintMusic(){
    const [history, setHistory] = useState<History[]>([])
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getHistory();
            setHistory(response.data.slice(0, 6)) // <-- Lấy 6 phần tử đầu
        }
        fetchApi();
    },[])
    console.log("history",history);
    return (
        <>
        <h2>Gợi ý cho bạn</h2>
        <div className="inner__list">
            {history.map((item) => (
                <Link to={`/song/${item.songId._id}`} className="inner__item" style={{ textDecoration: 'none', color: 'inherit' }} key={item._id}>
                    <div className="inner__item--image">
                        <img src={item.songId.avatar} alt={item.songId.title} />
                    </div>
                    <div className="inner__item--title">
                        <h4>{item.songId.title}</h4>
                        <p>
                        {item.songId.artist.map((artist, index) => (
                            <span key={artist._id}>
                                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
                                {index < item.songId.artist.length - 1 && ", "}
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
