import { useCallback, useEffect, useRef, useState } from "react";
import { getFavoritePaginated } from "../../Services/favorite.service";
import { Link } from "react-router-dom";
import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Song } from "../../models/song.model";
import { Spin } from "antd";

function Favorite(){
    const [favorite, setFavorite] = useState<Song[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastSongElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
      setLoading(true);
      const fetchFavorite = async () => {
          const response = await getFavoritePaginated(page, 12)
          setFavorite(prev => [...prev, ...response.data.data]);
          setHasMore(response.data.pagination.currentPage < response.data.pagination.totalPages);
      }
      fetchFavorite();
    }, [page])
    console.log("favorite", favorite);


    return (
        <>
            <h2 style={{color: 'white'}}>Danh sách yêu thích <HeartOutlined /></h2>
            {favorite.length > 0 ? (
                <>
                    <div className="inner__list">
                        {favorite.map((item, index) => {
                            const isLastElement = favorite.length === index + 1;
                            return (
                                <div className="inner__item" key={`${item._id}-${index}`} ref={isLastElement ? lastSongElementRef : null}>
                                    <Link to={`/song/${item._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <div className="inner__item--image">
                                            <img src={item.avatar} alt={item.title} />
                                        </div>
                                        <div className="inner__item--title">
                                            <h4>{item.title}</h4>
                                            <p>{item.artist.map((a: any) => a.name).join(", ")}</p>
                                        </div>
                                    </Link>
                                    <div className="play-button">
                                        <PlayCircleOutlined />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {loading && <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>}
                    {!hasMore && <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>Bạn đã xem hết.</div>}
                </>
            ) : (
                !loading && <h2>Danh sách trống</h2>
            )}
        </>
    );
}
export default Favorite;
