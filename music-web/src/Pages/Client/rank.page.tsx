import { useCallback, useEffect, useRef, useState } from "react"
import { getRankingsPaginated } from "../../Services/song.service";
import { Song } from "../../models/song.model";
import { Button, Col, Row,Spin } from "antd";
import { PlayCircleOutlined, TrophyOutlined } from "@ant-design/icons";
import "../../assets/scss/rank.scss"
import { Link } from "react-router-dom";

function Rank(){
    const [songs, setSongs] = useState<Song[]>([]);
     const [page, setPage] = useState(1)
     const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Biến để biết còn dữ liệu để tải không

    // Dùng để theo dõi phần tử cuối cùng trong danh sách
    const observer = useRef<IntersectionObserver | null>(null);
    const lastSongElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            // Nếu phần tử cuối cùng hiện ra trên màn hình và còn dữ liệu để tải
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1); // Tăng số trang để tải trang tiếp theo
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);
    
    useEffect(() => {
        // Chỉ fetch khi còn dữ liệu
        if (!hasMore) return;
        const fetchRank = async () => {
            try {
                const response = await getRankingsPaginated(page, 20); // Giả sử mỗi trang có 20 bài hát
                console.log("response", response);
                setSongs(prevSongs => [...prevSongs, ...response.data.data]);
                // Kiểm tra xem còn trang tiếp theo không
                setHasMore(response.data.pagination.currentPage < response.data.pagination.totalPages);
            } catch (error) {
                console.error("Lỗi khi tải bảng xếp hạng:", error);
            }
            setLoading(false);
        }
        fetchRank();
    }, [page]);
    console.log(songs);


    return(
        <>
        <h1 style={{color: "#EE7C71"}}>BXH Nhạc <TrophyOutlined /></h1>
        <Row gutter={[16, 16]} className="rank-container" style={{ marginTop: "20px", padding: "10px" }}>
           {songs.map((song, index) => {
            if (songs.length === index + 1) {
                return (
                    <Col span={24} key={`${song._id}-${index}`} ref={lastSongElementRef}>
                        <Link to={`/song/${song._id}`}>
                            <Row className="rank__item" align="middle" style={{ padding: "5px", border: "1px solid #231B2E", borderRadius: "5px"}}>
                                <Col xs={2}>
                                    <h2>{index + 1}</h2>
                                </Col>
                                <Col xs={1}>
                                -
                                </Col>
                                <Col xs={21} style={{ display: "flex", alignItems: "center" }}>
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
                );
            } else {
                return (
                    <Col span={24} key={`${song._id}-${index}`} >
                        <Link to={`/song/${song._id}`}>
                            <Row className="rank__item" align="middle" style={{ padding: "5px", border: "1px solid #231B2E", borderRadius: "5px"}}>
                                <Col xs={2}>
                                    <h2>{index + 1}</h2>
                                </Col>
                                <Col xs={1}>
                                -
                                </Col>
                                <Col xs={21} style={{ display: "flex", alignItems: "center" }}>
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
                );
            }
            })}
        </Row>
        {/* Hiển thị icon loading khi đang tải thêm dữ liệu */}
            {loading && <div style={{textAlign: 'center', padding: '20px'}}><Spin size="large" /></div>}
            {/* Hiển thị thông báo khi đã hết danh sách */}
            {!hasMore && songs.length > 0 && <div style={{textAlign: 'center', color: '#888', padding: '20px'}}>Bạn đã xem hết bảng xếp hạng.</div>}
        </>
    )
}
export default Rank