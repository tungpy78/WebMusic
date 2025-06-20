import { useEffect, useState } from "react";
import { Album } from "../../models/album.model";
import { getAllAlbum } from "../../Services/album.service";
import {  Col, Row } from "antd";
import "../../assets/scss/album.scss";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AlbumPage = () => {
    const[albumId, setAlbumId] = useState<Album[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllAlbum();
            setAlbumId(response.data);
        }
        fetchApi();
    }, []);

    console.log(albumId);

    return (
        <div>
            <h1>Album Page</h1>
            <Row gutter={[5, 5]}>
                {albumId.map((album) => (
                    <Col xs={24} md={12} lg={12} xl={8} key={album._id} className="album__card">
                        <Link to={`/album/${album._id}`}>
                        <div className="album__card--image">
                            <img src={album.avatar} alt={album.album_name} />   
                        </div>
                        <div className="album__card--details">
                            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 500 }}>{album.album_name}</h3>
                            <p style={{ color: '#ccc', fontSize: '1rem' }}>{album.artist.name}</p>
                        </div>
                        <div className="play-button">
                        <PlayCircleOutlined />  
                        </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AlbumPage;
