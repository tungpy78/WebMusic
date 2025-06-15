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
                        <h4>{item.songId.artist.name}</h4>
                        <p>{item.songId.title}</p>
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
