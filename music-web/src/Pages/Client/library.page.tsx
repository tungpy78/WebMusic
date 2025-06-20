import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import "../../assets/scss/playlist.scss"
import { Link } from "react-router-dom";
import { deletePlayList, getPlayList } from "../../Services/playlist.service";
import { Playlist1 } from "../../models/song.model";
import Favorite from "../../Components/element/favorite";
import { toast, ToastContainer } from "react-toastify";

function Library(){
    const [playlist, setPlayList] =  useState<Playlist1[]>([]);
    const fetchApi = async() => {
        const response = await getPlayList()
        setPlayList(response.data)
    }
    useEffect(() => {
        fetchApi();
    },[])

    const handleDelete = async(playlistId:string) => {
        const response = await deletePlayList(playlistId)
        toast.success(response.data.message)
        fetchApi();
    }
    
    console.log(playlist)
    return(
        <>
        <ToastContainer />
        <h1>Thư viện <PlayCircleOutlined /></h1>
        <h2>PlayList</h2>
        {playlist.length > 0 ? (
            <>
                <Row gutter={[20,20]}>
                    {playlist.map((item,index) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item._id} className="playlist" style={{border: "1px solid #231B2E",borderRadius:"8px",marginRight:"10px"}}>
                            <Link to={`/playlist/${item._id}`}>
                                <div className="inner--image">
                                    <img src={
                                        item.songs.length > 0
                                        ? item.songs[0].songId.avatar
                                        : "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/2/1/f/121fde6fe3898bc64cf04b716ddbe590.jpg"
                                    } 
                                    alt={item.name}/>
                                </div>
                                </Link>
                                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className="inner--title">
                                        <h4>{item.name}</h4>
                                        <p>{item.userId.fullname}</p>
                                    </div>
                                    <Button onClick={() => handleDelete(item._id)} danger><DeleteOutlined /></Button>
                                </div>
                        </Col>
                    ))}
                </Row>
            </>
        ) : (
            <>Danh sách trống</>
        )}
        <Favorite />
        </>
    )
}
export default Library;