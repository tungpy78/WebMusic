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


function PlayListDetail() {
   const param = useParams()
   const playlistId = param.playlistId as string
   const [dataPlayList, setDataPlayList] = useState<Playlist1 | null>(null);
   const playerRef = useRef<InstanceType<typeof APlayer> | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const aplayerContainerRef = useRef<HTMLDivElement>(null);


   const fetchApi = async () => {
    const response = await getPlayListDetail(playlistId)
    setDataPlayList(response.data)
    }

   useEffect(() => {
    fetchApi()
   },[])  
   console.log(dataPlayList)
   
   useEffect(() => {
    if (dataPlayList && dataPlayList.songs.length > 0 && aplayerContainerRef.current) {
        
      const player = new APlayer({
        element: aplayerContainerRef.current,
        audio: dataPlayList.songs.map((song) => ({
          name: song?.songId.title,
          artist: Array.isArray(song?.songId.artist)
          ? song.songId.artist.map((a) => a.name).join(", ")
          : "Unknown Artist",
          url: song?.songId.audio,
          cover: song?.songId.avatar,
        })),
        listMaxHeight: 9999,
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
  }, [dataPlayList?.songs]);


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
  const handleRemove = async (songId: string, playlistId:string) => {
    await removeSongPlayList(songId, playlistId)
    fetchApi()
  }
  console.log("dataPlayList", dataPlayList)

    
   
    return (
        <> 
        <ToastContainer />
        {dataPlayList ? (
                dataPlayList.songs.length === 0 ? (
                    <><h1>Danh sách trống</h1></>
                ) : (
                    <Row>
                        <Col xs={24} md={8} lg={6} style={{ textAlign: "center" }}>
                            <div className="playlist-image">
                                <img src={dataPlayList.songs[0].songId.avatar} alt={dataPlayList.name} />
                            </div>
                            <h3>{dataPlayList.name}</h3>
                            <p>Tạo bởi {dataPlayList.userFullname || "Unknown"}</p>
                            <Button onClick={handlePlay}>{isPlaying ? "Tạm dừng" : "Phát tất cả"}</Button>
                        </Col>
                        <Col xs={22} md={14} lg={16}>
                            <div
                            ref={aplayerContainerRef}
                            style={{ padding: "5px", background: "#170F23", border: "1px solid #231B2E" }}
                            />
                        </Col>
                        <Col xs={2}style={dataPlayList.songs.length > 1 ? { marginTop: "80px"} : {marginTop: "30px"}}>
                            {dataPlayList.songs.map((item,index) => (
                                <Button style={{marginTop:"1px", padding:"1px 5px", display:"block"}} onClick={() => handleRemove(item.songId._id,dataPlayList._id)} key={index} danger><DeleteOutlined/></Button>
                            ))}
                        </Col>
                    </Row>
                )
            ) : (
                <>Đang tải...</>
            )}
        </>
    )
}
export default PlayListDetail;