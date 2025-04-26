import { useEffect, useState } from "react"
import { getHistory } from "../../Services/history.service";
import { History } from "../../models/history.model";
import { PlayCircleOutlined } from "@ant-design/icons";


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
                    <div className="inner__item" key={item._id}>
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
                </div>
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