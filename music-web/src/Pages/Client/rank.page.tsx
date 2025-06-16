import { useEffect, useState } from "react"
import { getAllSong } from "../../Services/song.service";
import { Song } from "../../models/song.model";
import { Button, Col, Row } from "antd";
import { PlayCircleOutlined, TrophyOutlined } from "@ant-design/icons";
import "../../assets/scss/rank.scss"
import { Link } from "react-router-dom";

function Rank(){
    const [songs, setSongs] = useState<Song[]>([]);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        const fetchRank = async () => {
            try {
                const response = await getAllSong();  
                setSongs(response.data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        }
        fetchRank();
    }, []);
    console.log(songs);

    const displayedSongs = showAll ? songs : songs.slice(0, 10);

    return(
        <>
        <h1 style={{color: "#EE7C71"}}>BXH Nhạc <TrophyOutlined /></h1>
        <Row gutter={[16, 16]} className="rank-container" style={{ marginTop: "20px", padding: "10px" }}>
            {displayedSongs.map((song, index) => (
            <Col span={24} key={song._id}>
                <Link to={`/song/${song._id}`}>
                   <Row gutter={[16, 16]} className="rank__item" align="middle" style={{ padding: "5px", border: "1px solid #231B2E", borderRadius: "5px"}}>
                    <Col span={1}>
                        <h1>{index + 1}</h1>
                    </Col>
                    <Col span={1}>
                    -
                    </Col>
                    <Col span={22} style={{ display: "flex", alignItems: "center" }}>
                        <img src={song.avatar} alt={song.title} style={{ width: "50px", height: "50px", marginRight: "10px", objectFit: "cover" }} />
                        <div>
                            <h4 style={{ margin: 0 , color: "white"}}>{song.title}</h4>
                            <p className="rank--artist" style={{ margin: 0, color: "white" }}>
                            {song.artist.map((artist, index) => (
                                <span key={artist._id}>
                                <Link
                                    to={`/artist/${artist._id}`}
                                    style={{ color: "white", textDecoration: "none" }}
                                >
                                    {artist.name}
                                </Link>
                                {index < song.artist.length - 1 && ", "}
                                </span>
                            ))}
                            </p>
                        </div>
                        <div className="play-button">
                        <PlayCircleOutlined />  
                        </div>
                    </Col>
                </Row>
                </Link>
            </Col>
        ))}
        </Row>
        {songs.length > 10 && !showAll && (
                <Button
                    type="dashed"
                    onClick={() => setShowAll(true)}
                    style={{ margin: '20px auto', display: 'block' }}
                >
                    Xem thêm
                </Button>
            )}
        </>
    )
}
export default Rank