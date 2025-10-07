import { Button, Col, Input, Modal, Radio, Row, Tabs } from "antd";
import "../../assets/scss/songDetail.scss"
import "../../Layout/LayoutDefault/layoutdefault.scss"

import { FolderAddOutlined, HeartOutlined, PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Song } from "../../models/song.model";
import { addFavorite, addHistory, addPlayList, createPlayList, getSong } from "../../Services/song.service";
import { Link, useParams, useNavigate } from "react-router-dom";
import APlayer from "aplayer"; // Import APlayer
import 'aplayer/dist/APlayer.min.css'; // Import CSS của APlayer
import TabPane from "antd/es/tabs/TabPane";
import { Playlist } from "../../models/playList.model";
import { toast, ToastContainer } from "react-toastify";
import { getPlayList } from "../../Services/playlist.service";
import { postRelatedSongs } from "../../Services/recomandation.service";
import CarouselImage from "../../Components/element/caroucel-image";

function SongDetail() {
    const [song,setSong] = useState<Song | null>(null);
    const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);
    const params = useParams();
    const navigate = useNavigate(); 
    const [Favorite, setFavorite] = useState([]);
    const [PlayList, setPlayList] = useState([]);
    const [myPlayList, setMyPlayList] = useState<Playlist | null>(null);
    const [allPlayList, setAllPlayList] = useState<Playlist[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    // --- THAY ĐỔI 1: Tách state của "like" ra riêng ---
    const [likeCount, setLikeCount] = useState(0);

    const [isModelPlayList, setIsModelPlayList] = useState(false)
    const [playListId, setPlayListId] = useState("");
    const playerRef = useRef<InstanceType<typeof APlayer> | null>(null);
    const sessionHistoryRef = useRef<string[]>([]);
    

    const songId = params.songId as string;
    const fetchApi = async () => {
            try {
                const response = await getSong(songId);
                await addHistory(songId);
                setSong(response.data.song);
                setFavorite(response.data.favorite);
                setAllPlayList(response.data.allPlayList);
            } catch (error) {
                console.error("Lỗi khi tải thông tin bài hát:", error);
            }
        };
    useEffect(() => {
        fetchApi();

        // --- THAY ĐỔI 5: Thêm bài hát hiện tại vào lịch sử phiên ---
        // Cập nhật lịch sử phiên nghe
        const updatedHistory = [...sessionHistoryRef.current, songId].slice(-10); // Luôn giữ 10 bài gần nhất
        sessionHistoryRef.current = updatedHistory;
        console.log("Lịch sử 10 bài gần nhất:", sessionHistoryRef.current);

    }, [songId]); // Hook này chạy mỗi khi URL thay đổi (tức là khi chuyển bài)
    

    useEffect(() => {
        if (Favorite.length > 0) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [Favorite,PlayList]);

    const fetchApiRelatedSongs = async () => {
        try {
            // Gọi API để lấy danh sách bài hát liên quan
            // Bạn có thể bỏ dòng getPlayList() nếu không cần thiết ở đây
                const relatedResponse = await postRelatedSongs(
                    songId,
                    sessionHistoryRef.current  // Chỉ cần loại trừ bài hát hiện tại
                );
                setRelatedSongs(relatedResponse.data);
                console.log("Bài hát liên quan:", relatedResponse.data);
        } catch (error) {
            console.error("Lỗi khi tải bài hát liên quan:", error);
        }
    };

    useEffect(() => {
        if (song) {
            fetchApiRelatedSongs();
        }
    }, [song]);
    console.log("relatedSongs0",relatedSongs);
 

    useEffect(() => {
         // Hủy player cũ trước khi tạo cái mới
        if (playerRef.current) {
            playerRef.current.destroy();
        }
        if (song) {
            // Khởi tạo APlayer khi có song
            const player = new APlayer({
                element: document.getElementById("aplayer") as HTMLElement,
                audio: [
                    {
                        name: song.title,
                         artist: Array.isArray(song.artist)
                        ? song.artist.map((a) => a.name).join(", ")
                        : "Unknown Artist",
                        url: song.audio, // Đảm bảo URL chính xác
                        cover: song.avatar, // Đảm bảo ảnh bìa chính xác
                    },
                ],
                autoplay: true,
                preload: 'auto',

                
            });
            playerRef.current = player;
            // Đồng bộ trạng thái với APlayer
            player.on("play", () => setIsPlaying(true));
            player.on("pause", () => setIsPlaying(false));
             // --- THAY ĐỔI 6: LOGIC CHUYỂN TRANG THÔNG MINH ---
            player.on('ended', async () => {
                setIsPlaying(false);
                 // --- DÒNG CODE FIX LỖI ---
                if (playerRef.current) {
                    playerRef.current.pause();
                }
                console.log('Bài hát đã kết thúc, đang tìm bài hát tiếp theo...');

                try {
                    console.log("relatedSongs1:", relatedSongs);
                    if (relatedSongs && relatedSongs.length > 0) {
                        const nextSong = relatedSongs[0];
                        console.log(`Chuyển đến bài hát tiếp theo: "${nextSong.title}"`);
                        
                        // Thực hiện chuyển trang đến bài hát gợi ý đầu tiên
                        navigate(`/song/${nextSong._id}`);
                    } else {
                        console.log("Không tìm thấy bài hát gợi ý nào để chuyển tiếp.");
                        // (Tùy chọn) Bạn có thể chuyển đến một bài hát ngẫu nhiên hoặc trang chủ
                        // navigate('/'); 
                    }
                } catch (error) {
                    console.error('Lỗi khi lấy bài hát tiếp theo:', error);
                }
            });

            return () => {
                player.destroy();
                playerRef.current = null;
            };
        }
        
    }, [song]); // Thêm relatedSongs và navigate vào dependency


    const handlePlay = () => playerRef.current?.toggle();

    // --- THAY ĐỔI 2: Tối ưu hóa hàm handleAddFavorite ---
    const handleAddFavorite = async () => {
        // Cập nhật giao diện một cách "lạc quan" (optimistic UI update)
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        setLikeCount(prev => newFavoriteStatus ? prev + 1 : prev - 1);
        
        try {
            // Gửi yêu cầu lên server ở chế độ nền
            await addFavorite(songId);
        } catch (error) {
            // Nếu có lỗi, đảo ngược lại thay đổi trên UI
            console.error("Lỗi khi cập nhật yêu thích:", error);
            setIsFavorite(!newFavoriteStatus);
            setLikeCount(prev => newFavoriteStatus ? prev - 1 : prev + 1);
            toast.error("Đã có lỗi xảy ra!");
        }
    };
    
    // Hàm riêng để tải lại danh sách playlist sau khi thêm
    const refreshPlaylists = async () => {
        try {
            const response = await getPlayList(); // Giả sử hàm này lấy tất cả playlist của user
            setAllPlayList(response.data);
        } catch (error) {
            console.error("Lỗi khi tải lại playlists:", error);
        }
    }

    const handlePlayList = () => setIsModelPlayList(true);
    
    return (
        <> 
        <ToastContainer />
            <Row gutter={[16, 16]} className="songDetail__container">
                {song && 
                (<>
                    <Col xs={8} md={6}  key={song._id} style={{ textAlign: "center" }}>
                    <div className="inner__image">
                        <img src={song.avatar} alt={song.title} />
                    </div>
                    <div className="inner__title">
                        <h3>{song.title}</h3>
                       <p>
                        Ca sĩ:&nbsp;
                        {song.artist.map((artist, index) => (
                            <span key={artist._id}>
                            <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
                            {index < song.artist.length - 1 && ', '}
                            </span>
                        ))}
                        </p>
                        <p>{likeCount} người yêu thích</p>
                    </div>
                    <div>
                        <Button className="button" onClick={handlePlay} icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />} style={{marginTop: "10px"}} >{isPlaying ? "Dừng" : "Phát"}</Button>
                        <Button className="button" onClick={handleAddFavorite} icon={<HeartOutlined />} style={{marginTop: "10px"}} >{isFavorite ? "Đã yêu thích" : "Yêu thích"}</Button>
                        <Button className="button" onClick={handlePlayList} icon={<FolderAddOutlined />} style={{marginTop: "10px"}} >Playlist</Button>
                    </div>
                    </Col>
                </>)}
                <Col xs={16} md={18}>
                    <div id="aplayer" style={{padding:"5px", background:"#170F23" , border:"1px solid #231B2E"}}>

                    </div>
                    <div className="inner__info">
                        <h3>Thông tin</h3>
                        <p>Bài hát: {song?.title}</p>
                        <p>
                            Ca sĩ:&nbsp;
                            {song?.artist.map((artist, index) => (
                                <span key={artist._id}>
                                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
                                {index < song.artist.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p>Ngày phát hành:</p>
                        <p>Mô tả: {song?.description}</p>
                        <p>lyric:</p>
                        <div
                        className="songDetail__lyrics"
                        dangerouslySetInnerHTML={{ __html: song?.lyrics || '' }}
                        />
                    </div>
                </Col>
                <Modal
                title="Thêm bài hát vào Playlist"
                open={isModelPlayList}
                onCancel={() => setIsModelPlayList(false)}
                footer={null}
                >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Chọn Playlist có sẵn" key="1">
                    <Radio.Group
                    style={{ width: "100%" }}
                    onChange={(e) => {
                        console.log("Selected:", e.target.value);
                        // Gọi API để thêm bài hát vào playlist đã chọn
                        setPlayListId(e.target.value)
                    }}
                    >
                    <Row>
                        {allPlayList.map((item) => (
                            <Col span={24} key={item._id}>
                            <Radio value={item._id}>{item.name}</Radio>
                            </Col>
                        ))}
                        
                    </Row>
                    </Radio.Group>
                    <div style={{ marginTop: 16, textAlign: "right" }}>
                        <Button
                        type="primary"
                        onClick={async () => {
                            try {
                                const selectedPlayList = allPlayList.find(p => p._id === playListId);

                                if (selectedPlayList && selectedPlayList.songs.length >= 20) {
                                    toast.warning("Playlist đã đạt tối đa 20 bài hát!");
                                    return;
                                }
                                
                                const response = await addPlayList(songId, playListId);
                                // --- THAY ĐỔI 4: Không gọi fetchApi() nữa ---
                                refreshPlaylists(); // Chỉ tải lại danh sách playlist
                                setIsModelPlayList(false)
                                toast.success(response.data.message);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        >
                        Thêm vào Playlist
                        </Button>
                    </div>
                    </TabPane>

                    <TabPane tab="Tạo mới Playlist" key="2">
                    <Input.Search
                        placeholder="Nhập tên playlist mới"
                        enterButton="Tạo"
                        onSearch={ async (value) => {
                            try {
                                if(myPlayList && myPlayList.songs && myPlayList.songs.length >= 20){
                                    toast.warning("Playlist đã đạt tối đa 20 bài hát!");
                                    return;
                                }
                                await createPlayList(songId,value)
                                 // --- THAY ĐỔI 4: Không gọi fetchApi() nữa ---
                                refreshPlaylists(); // Chỉ tải lại danh sách playlist
                                setIsModelPlayList(false);
                                toast.success(`Đã thêm vào PlayList ${value}`)
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    />
                    </TabPane>
                </Tabs>
                </Modal>


            </Row>
            <h2>Có thể bạn cũng thích</h2>    
            <CarouselImage songs={relatedSongs} />
        </>
    );
}
export default SongDetail;
