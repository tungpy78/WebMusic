import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllSong, create_song } from '../../Services/song.service';
import { getArtist } from '../../Services/artist.service';
import { getTopic } from '../../Services/topic.service';

interface Artist {
    _id: string;
    name: string;
}

interface Genre {
    _id: string;
    title: string;
}

interface Song {
    _id: string;
    title: string;
    avatar: string;
    description: string;
    like: number;
    lyrics: string;
    audio: string;
    status: string;
    slug: string;
    deleted: boolean;
    artist: Artist[];
    genre: Genre;
    createdAt?: string;
    updatedAt?: string;
}

const Songs = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form state cho form thêm bài hát
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        lyrics: '',
        artistIds: [] as string[],
        genreId: '',
        avatarFile: null as File | null,
        audioFile: null as File | null,
    });

    // Phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const songsPerPage = 8;
    const totalPages = Math.ceil(songs.length / songsPerPage);
    const startIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(startIndex, startIndex + songsPerPage);

    // Lấy dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [songsResponse, artistsResponse, genresResponse] = await Promise.all([
                    getAllSong(),
                    getArtist(),
                    getTopic(),
                ]);
                setSongs(songsResponse.data);
                setArtists(artistsResponse.data);
                setGenres(genresResponse.data);
            } catch (error) {
                setError('Không thể tải dữ liệu.');
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Xử lý form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value, multiple, selectedOptions } = e.target;
        if (multiple) {
            const values = Array.from(selectedOptions).map((option) => option.value);
            setFormData((prev) => ({
                ...prev,
                [name]: values,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSave = async () => {
        if (!formData.title.trim() || !formData.genreId || formData.artistIds.length === 0) {
            alert('Vui lòng nhập đầy đủ tên bài hát, thể loại, và ít nhất một nghệ sĩ.');
            return;
        } else if (!formData.audioFile || !formData.avatarFile) {
            alert('Vui lòng chọn đầy đủ file nhạc và ảnh.');
            return;
        }

        try {
            const newSong = await create_song(
                formData.audioFile,
                formData.title,
                formData.genreId,
                formData.avatarFile,
                formData.description,
                formData.lyrics,
                formData.artistIds
            );
            setSongs([...songs, newSong.data]);
            alert(`Đã thêm bài hát: ${formData.title}`);
            setFormData({
                title: '',
                description: '',
                lyrics: '',
                artistIds: [],
                genreId: '',
                avatarFile: null,
                audioFile: null,
            });
            setShowForm(false);
            setCurrentPage(Math.floor((songs.length) / songsPerPage));
        } catch (error) {
            alert('Lỗi khi thêm bài hát.');
            console.error('Lỗi:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            lyrics: '',
            artistIds: [],
            genreId: '',
            avatarFile: null,
            audioFile: null,
        });
        setShowForm(false);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
    }

    return (
        <div style={{ width: '90%', maxHeight: '90%', margin: '0 auto' }}>
            <div
                style={{
                    width: '100%',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '26px',
                            fontWeight: '600',
                            color: '#1976d2',
                            margin: 0,
                            textShadow: '0 1px 1px rgba(0,0,0,0.05)',
                            letterSpacing: '0.5px',
                        }}
                    >
                        Danh sách bài hát
                    </h2>
                    <button
                        onClick={() => setShowForm(true)}
                        onMouseEnter={() => setIsHoveringAdd(true)}
                        onMouseLeave={() => setIsHoveringAdd(false)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: isHoveringAdd ? '#45a049' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        Thêm bài hát
                    </button>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '10% 40% 20% 30%',
                        fontWeight: 'bold',
                        padding: '12px 16px',
                        backgroundColor: '#f1f1f1',
                        borderBottom: '2px solid #ddd',
                        borderRadius: '8px 8px 0 0',
                    }}
                >
                    <div>STT</div>
                    <div>Tên bài hát</div>
                    <div>Số lượt thích</div>
                    <div style={{ textAlign: 'center' }}>Hành động</div>
                </div>

                {currentSongs.map((song, index) => (
                    <div
                        key={song._id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '10% 40% 20% 30%',
                            padding: '12px 16px',
                            backgroundColor: '#fff',
                            marginBottom: '8px',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            alignItems: 'center',
                            transition: 'background-color 0.2s',
                            cursor: 'default',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                        <div>{startIndex + index + 1}</div>
                        <div>{song.title}</div>
                        <div>{song.like}</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                            <button
                                style={{
                                    padding: '6px 6px',
                                    backgroundColor: 'transparent',
                                    color: '#9e9e9e',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '2px',
                                }}
                                onClick={() => {
                                    setSelectedSong(song);
                                    setShowDetailModal(true);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'eye']}
                                    style={{
                                        color: '#9e9e9e',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#616161';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '#9e9e9e';
                                    }}
                                />
                            </button>
                            <button
                                style={{
                                    padding: '6px 6px',
                                    backgroundColor: 'transparent',
                                    color: '#2196F3',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '2px',
                                }}
                                onClick={() => alert('Chức năng sửa đang phát triển')}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'pen']}
                                    style={{
                                        color: '#2196F3',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#0d47a1';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '#2196F3';
                                    }}
                                />
                            </button>
                            <button
                                style={{
                                    padding: '6px 6px',
                                    backgroundColor: 'transparent',
                                    color: '#f44336',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '2px',
                                }}
                                onClick={() => alert('Chức năng xóa đang phát triển')}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'trash']}
                                    style={{
                                        color: '#f44336',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#b71c1c';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '#f44336';
                                    }}
                                />
                            </button>
                        </div>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        {Array.from({ length: totalPages }, (_, pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => setCurrentPage(pageIndex)}
                                style={{
                                    margin: '0 5px',
                                    padding: '6px 12px',
                                    border: '1px solid #ccc',
                                    backgroundColor: currentPage === pageIndex ? '#4CAF50' : '#fff',
                                    color: currentPage === pageIndex ? '#fff' : '#000',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                )}

                {showForm && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1010,
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                height: '85%',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                padding: '24px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                                overflowY: 'scroll',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <h2 style={{ margin: 0, textAlign: 'center' }}>Thêm bài hát</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Nhập tên bài hát"
                                value={formData.title}
                                onChange={handleInputChange}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Nhập mô tả"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                            <textarea
                                name="lyrics"
                                placeholder="Nhập lời bài hát"
                                value={formData.lyrics}
                                onChange={handleInputChange}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                    minHeight: '100px',
                                }}
                            />
                            <div>
                                <select
                                    name="artistIds"
                                    value={formData.artistIds}
                                    onChange={handleInputChange2}
                                    multiple
                                    style={{
                                        padding: '10px 14px',
                                        fontSize: '16px',
                                        borderRadius: '6px',
                                        border: '1px solid #ccc',
                                        outline: 'none',
                                        width: '100%',
                                        height: '150px',
                                    }}
                                    title="Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều nghệ sĩ"
                                >
                                    {artists.map((artist) => (
                                        <option key={artist._id} value={artist._id}>
                                            {artist.name}
                                        </option>
                                    ))}
                                </select>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                    Giữ Ctrl (Windows) hoặc Cmd (Mac) để chọn nhiều nghệ sĩ
                                </div>
                                {formData.artistIds.length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <strong>Đã chọn:</strong>{' '}
                                        {artists
                                            .filter((artist) => formData.artistIds.includes(artist._id))
                                            .map((artist) => artist.name)
                                            .join(', ')}
                                    </div>
                                )}
                            </div>
                            <select
                                name="genreId"
                                value={formData.genreId}
                                onChange={handleInputChange2}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                                required
                            >
                                <option value="">Chọn thể loại</option>
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.title}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="file"
                                name="avatarFile"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                                required
                            />
                            <input
                                type="file"
                                name="audioFile"
                                accept="audio/*"
                                onChange={handleFileChange}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                                required
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    onClick={handleCancel}
                                    style={{
                                        padding: '10px 18px',
                                        backgroundColor: '#e0e0e0',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        padding: '10px 18px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDetailModal && selectedSong && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1010,
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                height: '90%',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                padding: '24px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1px',
                                overflowY: 'scroll',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            <h2 style={{ margin: 0, textAlign: 'center' }}>Chi tiết bài hát</h2>
                            <img
                                src={selectedSong.avatar}
                                alt={`Avatar của ${selectedSong.title}`}
                                style={{ maxWidth: '200px', margin: '0 auto', borderRadius: '8px' }}
                            />
                            <p><strong>Tên bài hát:</strong> {selectedSong.title}</p>
                            <p><strong>Nghệ sĩ:</strong> {selectedSong.artist.map((a) => a.name).join(', ')}</p>
                            <p><strong>Thể loại:</strong> {selectedSong.genre.title}</p>
                            <p><strong>Mô tả:</strong> {selectedSong.description}</p>
                            <p><strong>Lượt thích:</strong> {selectedSong.like.toLocaleString()}</p>
                            <p><strong>Lời bài hát:</strong></p>
                            <div
                                className="songDetaillyrics"
                                dangerouslySetInnerHTML={{ __html: selectedSong.lyrics || '' }}
                            />
                            <p>
                                <strong>Audio:</strong>{' '}
                                <a href={selectedSong.audio} target="_blank" rel="noopener noreferrer">
                                    {selectedSong.audio}
                                </a>
                            </p>
                            <p><strong>Trạng thái:</strong> {selectedSong.status ? 'Đang hoạt động' : 'Khóa'}</p>
                            <p><strong>Slug:</strong> {selectedSong.slug}</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    style={{
                                        padding: '10px 18px',
                                        backgroundColor: '#e0e0e0',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Songs;