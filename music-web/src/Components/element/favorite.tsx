import { useEffect, useState } from "react";
import { getFavorite } from "../../Services/favorite.service";
import { Link } from "react-router-dom";
import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Song } from "../../models/song.model";
import { Button } from "antd";

function Favorite(){
    const [favorite, setFavorite] = useState<Song[]>([]);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        const fetchFavorite = async () => {
            const response = await getFavorite()
            setFavorite(response.data)
        }   
        fetchFavorite();
    },[])
    console.log("favorite", favorite);

    // Chỉ lấy 6 bài đầu nếu chưa bấm "Xem thêm"
  const displayedSongs = showAll ? favorite : favorite.slice(0, 6);

    return (
    <>
      <h2>Danh sách yêu thích</h2>
      {favorite.length > 0 ? (
        <>
          <div className="inner__list">
            {displayedSongs.map((item) => (
              <div className="inner__item" key={item._id}>
                <Link
                  to={`/song/${item._id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '100%'
                  }}
                >
                  <div className="inner__item--image">
                    <img src={item.avatar} alt="poster" />
                  </div>
                  <div className="inner__item--title">
                    <h4>{item.title}</h4>
                  </div>
                </Link>
                <div className="play-button">
                  <PlayCircleOutlined />
                </div>
              </div>
            ))}
          </div>
          {favorite.length > 6 && !showAll && (
            <Button
              type="dashed"
              onClick={() => setShowAll(true)}
              style={{ margin: '20px auto', display: 'block' }}
            >
              Xem thêm
            </Button>
          )}
        </>
      ) : (
        <h2>Danh sách trống</h2>
      )}
    </>
  );
}
export default Favorite;