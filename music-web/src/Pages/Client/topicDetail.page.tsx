import { HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSongsByCategoryPaginated } from "../../Services/topic.service";
import { Link, useParams } from "react-router-dom";
import { Song } from "../../models/song.model";
import Spin from "antd/es/spin";

function TopicDetail() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const params = useParams();
    const categoryId = params.topicId as string;

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

     // Reset state khi chuyển qua topic khác
    useEffect(() => {
        setSongs([]);
        setPage(1);
        setHasMore(true);
        setCategoryName("");
    }, [categoryId]);

    useEffect(() => {
      if (!categoryId) return;
        const fetchSongs = async () => {
            try {
                const response = await getSongsByCategoryPaginated(categoryId, page, 20)
                console.log("responsetopic", response);
                setSongs(prev => [...prev, ...response.data.data]);
                setCategoryName(response.data.categoryName);
                setHasMore(response.data.pagination.currentPage < response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, [categoryId, page]);
    console.log("songs", songs);
    
    return (
        <>
            <h2 style={{color: 'white'}}>{categoryName}</h2>
            {songs.length > 0 ? (
                <>
                    <div className="inner__list">
                        {songs.map((item, index) => {
                             const isLastElement = songs.length === index + 1;
                             return (
                                 <div className="inner__item" key={`${item._id}-${index}`} ref={isLastElement ? lastSongElementRef : null}>
                                    <Link to={`/song/${item._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                      <div className="inner__item--image">
                                        <img src={item.avatar} alt="poster" />
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
                                    </Link>
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

export default TopicDetail;
