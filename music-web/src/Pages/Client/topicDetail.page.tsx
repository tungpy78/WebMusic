import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getSongByTopic } from "../../Services/topic.service";
import { Link, useParams } from "react-router-dom";
import { Song } from "../../models/song.model";

function TopicDetail() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [nameTopic, setNameTopic] = useState("");
    const params = useParams();
    const topicId = params.topicId as string;

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await getSongByTopic(topicId)
                setSongs(response.data.songs);  
                setNameTopic(response.data.nameTopic.title);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);
    console.log("songs", songs);
    
    return(
        <>
        <h2>{nameTopic}</h2>

        {songs.length > 0 ? (
            <>
            <div className="inner__list">
            {songs.map((item) => (
                <div className="inner__item" key={item._id}>
                <Link to={`/song/${item._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <div className="inner__item--image">
                    <img src={item.avatar} alt="poster" />
                  </div>
                  <div className="inner__item--title">
                    <h4>{item.artist.name}</h4>
                    <p>{item.title}</p>
                  </div>
                </Link>
            
                <div className="play-button">
                  <PlayCircleOutlined />
                </div>
                <div className="favorite-button">
                  <HeartOutlined />
                </div>
              </div>
            ))} 
        </div>
            </>
        ) : (
            <>
            <h2>Danh sách trống</h2>
            </>
        )}
        </>
    )
}
export default TopicDetail;