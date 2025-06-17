import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Playlist1 } from "../../models/song.model"
import { getPlayListDetail, removeSongPlayList } from "../../Services/playlist.service"
import { ToastContainer } from "react-toastify"
import { Button, Col, Row } from "antd"
import APlayer from "aplayer"
import 'aplayer/dist/APlayer.min.css'; // Import CSS của APlayer
import "../../assets/scss/playlistdetail.scss"
import { DeleteOutlined } from "@ant-design/icons"
import { getAlbumById } from "../../Services/album.service"
import { Album } from "../../models/album.model"
import { Link } from "react-router-dom"


function AlbumDetail() {
   const param = useParams()
   const albumId = param.albumId as string
   const [dataAlbum, setDataAlbum] = useState<Album | null>(null);
   const playerRef = useRef<InstanceType<typeof APlayer> | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const aplayerContainerRef = useRef<HTMLDivElement>(null);


   const fetchApi = async () => {
    const response = await getAlbumById(albumId)
    setDataAlbum(response.data)
    }

   useEffect(() => {
    fetchApi()
   },[])  

   console.log("dataAlbum", dataAlbum)
   console.log("album song", dataAlbum?.songs[0]?.audio)
   

   useEffect(() => {
    if (dataAlbum && dataAlbum.songs.length > 0 && aplayerContainerRef.current) {

      const player = new APlayer({
        element: aplayerContainerRef.current,
        audio: dataAlbum.songs.map((song) => ({
          name: song.title,
          artist: song.artist.map((a) => a.name).join(", "),
          url: song.audio,
          cover: song.avatar, 
        })),
        autoplay:true,
      });

      playerRef.current = player;

        // Đồng bộ trạng thái với APlayer
        player.on("play", () => setIsPlaying(true));
        player.on("pause", () => setIsPlaying(false));
      

      player.on("ended", () => {
        return () => {
            setIsPlaying(false)
            player.destroy();
            playerRef.current = null;
          };
      });

      // Cleanup the player when component unmounts or data changes
      
    }
  }, [dataAlbum?.songs]);


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
  }

    
   
    return (
        <> 
        <ToastContainer />
        {dataAlbum ? (
                dataAlbum.songs.length === 0 ? (
                    <><h1>Danh sách trống</h1></>
                ) : (
                    <Row gutter={[10,10]}>
                        <Col span={6} style={{ textAlign: "center" }}>
                            <div className="playlist-image">
                                <img src={dataAlbum.avatar} alt={dataAlbum.album_name} />
                            </div>
                            <h3>{dataAlbum.album_name}</h3>
                            <Link  to={`/artist/${dataAlbum.artist._id}`}><p>{dataAlbum.artist?.name}</p></Link>
                            <Button onClick={handlePlay}>{isPlaying ? "Tạm dừng" : "Phát tất cả"}</Button>
                        </Col>
                        <Col span={17}>
                            <div
                            ref={aplayerContainerRef}
                            style={{ padding: "5px", background: "#170F23", border: "1px solid #231B2E" }}
                            />
                            <div style={{ marginLeft: "10px" }}>
                                <h3>Thông tin</h3>
                                <p>Số bài hát: {dataAlbum.songs.length}</p>
                                <p>Ngày phát hành: {new Date(dataAlbum.release_day).toLocaleDateString("vi-VN")}</p>
                            </div>
                        </Col>
                    </Row>
                )
            ) : (
                <>Đang tải...</>
            )}
        </>
    )
}
export default AlbumDetail;