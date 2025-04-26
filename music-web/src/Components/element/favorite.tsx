import { useEffect, useState } from "react";
import { getFavorite } from "../../Services/favorite.service";
import { Link } from "react-router-dom";
import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Song } from "../../models/song.model";

function Favorite(){
    const [favorite, setFavorite] = useState<Song[]>([]);
    useEffect(() => {
        const fetchFavorite = async () => {
            const response = await getFavorite()
            setFavorite(response.data)
        }   
        fetchFavorite();
    },[])
    return(
        <>
        <h2>Danh sách yêu thích</h2>
        {favorite.length > 0 ? (
            <>
            <div className="inner__list">
            {favorite.map((item) => (
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
export default Favorite;