import { Button, Col, Input, Modal, Radio, Row, Tabs } from "antd";
import "../../assets/scss/songDetail.scss"
import "../../Layout/LayoutDefault/layoutdefault.scss"

import { FolderAddOutlined, HeartOutlined, PauseOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Song } from "../../models/song.model";
import { addFavorite, addHistory, addPlayList, createPlayList, getSong } from "../../Services/song.service";
import { Link, useParams } from "react-router-dom";
import APlayer from "aplayer"; // Import APlayer
import 'aplayer/dist/APlayer.min.css'; // Import CSS của APlayer
import TabPane from "antd/es/tabs/TabPane";
import { Playlist } from "../../models/playList.model";
import { toast, ToastContainer } from "react-toastify";

function SongDetail() {
    const [song,setSong] = useState<Song | null>(null);
    const params = useParams();
    const [Favorite, setFavorite] = useState([]);
    const [PlayList, setPlayList] = useState([]);
    const [allPlayList, setAllPlayList] = useState<Playlist[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModelPlayList, setIsModelPlayList] = useState(false)
    const [playListId, setPlayListId] = useState("");
    const playerRef = useRef<InstanceType<typeof APlayer> | null>(null);
    

    const songId = params.songId as string;
    const fetchApi = async () => {
        const response = await getSong(songId)
        
        setSong(response.data.song)
        setFavorite(response.data.favorite)
        setPlayList(response.data.playList)
        setAllPlayList(response.data.allPlayList)
    }

    useEffect(() => {
        fetchApi();
    },[songId]);

    useEffect(() => {
        if (Favorite.length > 0) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [Favorite,PlayList]);
    
    useEffect(() => {
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
                autoplay:true,
                
            });
            playerRef.current = player;
            // Đồng bộ trạng thái với APlayer
            player.on("play", () => setIsPlaying(true));
            player.on("pause", () => setIsPlaying(false));
            player.on("ended", () => setIsPlaying(false));

            return () => {
                player.destroy();
                playerRef.current = null;
            };
        }
        
    }, [song?.audio]); // Chạy lại khi song thay đổi

   useEffect(() => {
    if (song) {
        const fetchApiHistory = async () => {
          await addHistory(songId)
        }
        fetchApiHistory();
      }
   },[song])

    const handlePlay = () => {
        const player = playerRef.current;
        if (!player) return;

        if (isPlaying) {
            player.pause();
            setIsPlaying(false);
        } else {
            player.play();
            setIsPlaying(true);
        }
    };
    const handleAddFavorite = async () => {
        try {
            setIsFavorite(!isFavorite);
            await addFavorite(songId);
            setSong(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    like: isFavorite ? prev.like - 1 : prev.like + 1
                };
            });
        } catch (error) {
            console.log("error", error)
        }
    }
    const handlePlayList = async () => {
        setIsModelPlayList(true)
    }
    

    
    return (
        <> 
        <ToastContainer />
            <Row gutter={[16, 16]} className="songDetail__container">
                {song && 
                (<>
                    <Col span={6} key={song._id} style={{ textAlign: "center" }}>
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
                        <p>{song.like} người yêu thích</p>
                    </div>
                    <div>
                        <Button onClick={handlePlay} icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />} style={{marginTop: "10px"}} >{isPlaying ? "Dừng" : "Phát"}</Button>
                        <Button onClick={handleAddFavorite} icon={<HeartOutlined />} style={{marginTop: "10px"}} >{isFavorite ? "Đã yêu thích" : "Yêu thích"}</Button>
                        <Button onClick={handlePlayList} icon={<FolderAddOutlined />} style={{marginTop: "10px"}} >Thêm vào Playlist</Button>
                    </div>
                    </Col>
                </>)}
                <Col span={18}>
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
                                console.log(playListId);
                                const response = await addPlayList(songId, playListId);
                                setIsModelPlayList(false)
                                toast.success(response.data.message);
                                fetchApi();
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
                                await createPlayList(songId,value)
                                setIsModelPlayList(false);
                                toast.success(`Đã thêm vào PlayList ${value}`)
                                fetchApi();
                            } catch (error) {
                                console.log(error)
                            }
                        }}
                    />
                    </TabPane>
                </Tabs>
                </Modal>


            </Row>
        </>
    )
}
export default SongDetail;