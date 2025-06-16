import { useEffect, useState } from "react"
import { getHistory } from "../../Services/history.service";
import { History } from "../../models/history.model";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


function HistorySong(){
    const [history, setHistory] = useState<History[]>([])
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getHistory();
            setHistory(response.data)
        }   
        fetchApi();
    },[])
    console.log(history)
    return(
        <>
        <h1>Nghe gần đây</h1>
        {history.length > 0 ? (
            <>
            <div className="inner__list">
                {history.map((item) => (
                    <Link to={`/song/${item.songId._id}`} className="inner__item" key={item._id}>
                    <div className="inner__item--image">
                           <img src={item.songId.avatar} alt={item.songId.title} />
                       </div>
                       <div className="inner__item--title">
                            <h4 style={{ margin: 0 , color: "white"}}>{item.songId.title}</h4>
                            <p style={{ margin: 0, color: "white" }}>
                            {item.songId.artist.map((artist, index) => (
                                <span key={artist._id}>
                                <Link
                                    to={`/artist/${artist._id}`}
                                    style={{ color: "white", textDecoration: "none" }}
                                >
                                    {artist.name}
                                </Link>
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
        ):(
            <>
            <h2>Danh sách trống</h2>
            </>
        )}
        </>
    )
}
export default HistorySong