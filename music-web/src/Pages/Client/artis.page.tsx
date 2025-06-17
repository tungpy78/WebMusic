import { useEffect, useState } from "react";
import { Artist } from "../../models/artist.model";
import { getArtistById } from "../../Services/artist.service";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "antd";
import "../../assets/scss/artist.scss";
import "../../assets/scss/album.scss";
import PlayCircleOutlined from "@ant-design/icons/lib/icons/PlayCircleOutlined";

const ArtistPage = () => {
    const [dataArtist, setDataArtist] = useState<Artist | null>(null);
    const params = useParams();
    const artistId = params.artistId || '';
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getArtistById(artistId);
                setDataArtist(response.data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };
        fetchApi();
    }, [artistId]);
    console.log('dataArtist', dataArtist);
  return (
    <>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }} className="artist__page">
            <Col span={6}>
                <div className="artist--image">
                    <img src={dataArtist?.imageUrl} alt={dataArtist?.name} />
                </div>
            </Col>
            <Col span={18}>
                <div className="artist-info">
                    <h1>{dataArtist?.name} <PlayCircleOutlined /></h1>
                    <p>{dataArtist?.bio}</p>
                </div>
            </Col>
        </Row>
        <h2>Bài hát nổi bật</h2>
        <Row gutter={[16,0]} className="inner__list">
            {dataArtist?.songs.map((song) => (
                <Col span={11} key={song._id} className="inner__item">
                    <Link
                      to={`/song/${song._id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'inherit',
                        width: '100%'
                      }}
                    >
                    <div className="inner__item--image">
                        <img src={song.avatar} alt="poster" />
                    </div>
                    <div className="inner__item--title">
                        <h4>{song.title}</h4>
                       <p>
                        {song.artist.map((artist, index) => (
                            <span key={artist._id}>
                                <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
                                {index < song.artist.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                    </div>
                    </Link>
                    <div className="play-button">
                        <PlayCircleOutlined />
                    </div>
                </Col>
            ))}
        </Row>
        <h2>Album</h2>
        {dataArtist?.albums.length ? (
            <Row gutter={[16, 16]} style={{ margin: '20px' }}>
                {dataArtist.albums.map((album) => (
                    <Col span={8} key={album._id} className="album__card">
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
        ) : (
            <p>Không có album nào.</p>
        )}
    </>
  );
};

export default ArtistPage;
