import React, { useEffect, useState } from 'react';
import { changeSong, createAlbum, getAlbum, updateAlbum } from '../../Services/album.service';
import { AlbumRequest, AlbumResponsor, ArtistAdmin, SongAdmin } from '../../models/album.model';
import { getRankingsPaginated, getSongsByArtist } from '../../Services/song.service';
import { getArtist } from '../../Services/artist.service';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

const AlbumStyles = () => (
    <style>
        {`
        /* Container chính */
        .album-container {
            width: 90%;
            font-family: Arial, sans-serif;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #f9f9f9;
        }

        /* Header: chứa tiêu đề và nút Thêm */
        .album-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }

        .album-header h2 { margin: 0; color: #333; }

        /* Bảng hiển thị danh sách */
        .album-table { width: 100%; border-collapse: collapse; text-align: left; }
        .album-table th, .album-table td { padding: 12px 15px; border-bottom: 1px solid #ddd; }
        .album-table th { background-color: #f2f2f2; font-weight: bold; color: #555; }
        .album-table th:first-child, .album-table td:first-child { text-align: center; }
        .album-avatar { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; vertical-align: middle; }

        /* Các nút bấm chung */
        .btn { padding: 8px 12px; border: none; border-radius: 5px; cursor: pointer; color: white; font-size: 14px; transition: opacity 0.2s; }
        .btn:hover { opacity: 0.85; }
        .btn-primary { background-color: #007bff; }
        .btn-info { background-color: #17a2b8; }
        .btn-success { background-color: #28a745; }
        .btn-warning { background-color: #ffc107; color: #333; }
        .action-buttons { display: flex; gap: 8px; }

        /* === CSS for Modal === */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { height: 85%; background: white; padding: 25px; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); overflow: auto}
        .modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
        .modal-header h3 { margin: 0; }
        .modal-body .form-group { margin-bottom: 15px; }
        .modal-body label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
        .modal-body input, .modal-body textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .btn-secondary { background-color: #6c757d; }
        
        /* === CSS for Custom Song Select === */
        .custom-select-container { position: relative; }
        .select-input { background: #fff; border: 1px solid #ccc; border-radius: 4px; padding: 10px; width: 100%; cursor: pointer; display: flex; flex-wrap: wrap; gap: 5px; min-height: 40px; box-sizing: border-box; }
        .select-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ccc; border-top: none; border-radius: 0 0 4px 4px; max-height: 200px; overflow-y: auto; z-index: 1001; }
        .select-dropdown-item { padding: 10px; cursor: pointer; }
        .select-dropdown-item:hover { background-color: #f0f0f0; }
        .select-dropdown-item.selected { background-color: #007bff; color: white; }
        .selected-song-pill { background-color: #007bff; color: white; padding: 3px 8px; border-radius: 12px; font-size: 13px; display: flex; align-items: center; gap: 5px; }
        .pill-remove-btn { cursor: pointer; font-weight: bold; }
        `}
    </style>
);
const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none',
};

const cancelBtnStyle: React.CSSProperties = {
  padding: '10px 18px',
  backgroundColor: '#e0e0e0',
  border: 'none',
  borderRadius: '6px',
  fontSize: '15px',
  cursor: 'pointer'
};

const saveBtnStyle: React.CSSProperties = {
  padding: '10px 18px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '15px',
  cursor: 'pointer'
};

const Album = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFormDetail,setShowFormDetail] = useState(false);
    const [showFormAddSong,setShowFormAddSong] = useState(false);

    const [albums, setAlbums] = useState<AlbumResponsor[]>([]);
    const [albumId,setAlbumId] = useState<string>('');
    const [albumName, setAlbumName] = useState<string>('');
    const [decription, setDecription] = useState<string>('');
    const [releaseDay, setReleaseDay] = useState<string>(''); 
    const [avatar, setAvatar] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);   
    const [artistId, setArtistId] = useState<string>('');  
    const [songIds, setSongIds] = useState<string[]>([]);
    const [iscreate, setiscreate] = useState<boolean>(false);
    useEffect(() => {
                    const fethApi = async () => {
                        try {
                            const result = await getAlbum();
                            setAlbums(result?.data);
                            const resultArtist = await getArtist();
                            setAllAvailableArtist(resultArtist?.data);
                            console.error(result?.data);
                        } catch (error) {
                            console.log("errortopic", error);
                        }
                    }
                    fethApi();
                },[]);

    const [allAvailableSongs, setAllAvailableSongs] = useState<SongAdmin[]>([]);
    const [allAvailableArtist, setAllAvailableArtist] = useState<ArtistAdmin[]>([]);
    const [artistForAlbum,setArtistForAlbum] = useState<ArtistAdmin>();
    const [allAvailableSongsRequest, setAllAvailableSongsRequest] = useState<SongAdmin[]>([]);

    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 8;
    const totalPages = Math.ceil(albums.length / accountsPerPage);
    const startIndex = currentPage * accountsPerPage;
    const currentAlbums = albums.slice(startIndex, startIndex + accountsPerPage);

    const songOptions = allAvailableSongs.map(song => ({
        value: song._id,
        label: song.title,
    }));

    const setdatasong = async(artist_id: string) =>{
        if(!artist_id){
             setAllAvailableSongs([]);
        }else{
            const result = await getSongsByArtist(artist_id);
            setAllAvailableSongs(result?.data);
        }
        
    }

    const handleSaveAlbum = async() => {
        const newAlbum: AlbumRequest = {
            album_name: albumName,
            decription: decription,
            release_day: releaseDay,
            avatar: avatar,
            artist: artistId,
            songs: songIds,
        };

        try {
            if(iscreate){
                await createAlbum(newAlbum);
                toast('Tạo thành công!');
            }else{              
                await updateAlbum(albumId,newAlbum);
                toast('update thành công!');
            }
            const updatedResult = await getAlbum();
            setAlbums(updatedResult.data);
            clearForm();
            setShowForm(false);
            setiscreate(false);
        } catch (err) {
            console.error(err);
            toast('Tạo thất bại:' + err);
        }
    };

    const clearForm = () => {
        setAlbumId('');
        setAlbumName('');
        setDecription('');
        setReleaseDay('');
        setAvatar(null);
        setImagePreview(null);
        setArtistId('');
        setSongIds([]);
    };

    // xem chi tiết 
    const handleViewDetails = (album: AlbumResponsor) => {
        setAlbumName(album.album_name);
        setDecription(album.decription);
        setReleaseDay(album.release_day);
        setImagePreview(album.avatar);
        setArtistForAlbum(album.artist);
        setAllAvailableSongs(album.songs);

    };

    //thêm bài hát
    const handleAddSong = async(album: AlbumResponsor) => {
        setAlbumName(album.album_name);
        setArtistForAlbum(album.artist);
        setAllAvailableSongsRequest(album.songs);
        const result = await getSongsByArtist(album.artist._id);
        // Lọc bỏ các bài hát đã có trong album.songs
        const filteredSongs = result?.data.filter(
            (song: SongAdmin) => !album.songs.some((s: SongAdmin) => s._id === song._id)
        );
        setAllAvailableSongs(filteredSongs);
    };

    const handleRemoveSong = async(song: SongAdmin)=>{
        setAllAvailableSongsRequest(prev => prev.filter(s => s._id !== song._id));
        setSongIds(prev => prev.filter(id => id !== song._id));
        // Thêm lại vào danh sách có thể chọn
        setAllAvailableSongs(prev => {
            // Kiểm tra nếu chưa tồn tại thì thêm vào
            const alreadyExists = prev.some(s => s._id === song._id);
            return alreadyExists ? prev : [...prev, song];
        });
    }

    const handleSaveSong = async()=>{
        try {
        const newSongIds = allAvailableSongsRequest.map(song => song._id);
        await changeSong(newSongIds, albumId);
        const result = await getAlbum();
        setAlbums(result?.data);
        toast("Lưu bài hát thành công.");
        setShowFormAddSong(false); 
        clearForm();
        } catch (err) {
        console.error("Lỗi khi lưu bài hát:", err);
        toast("Đã xảy ra lỗi. Không thể lưu bài hát.");
        }
    }
    //Chỉnh sửa album
    const handleEditAlbum = (album: AlbumResponsor) => {
        setAlbumName(album.album_name);
        setDecription(album.decription);
        setArtistId(album.artist._id)
        const date = new Date(album.release_day);
        const formattedDate = date.toISOString().split('T')[0];
        setReleaseDay(formattedDate);
        setImagePreview(album.avatar);
    };

    return (
        <>
            <ToastContainer/>
            <AlbumStyles />
            <div className="album-container">
                <div className="album-header">
                    <h2>Quản lý Album</h2>
                    {/* Nút này bây giờ sẽ mở modal */}
                    <button className="btn btn-primary" onClick={() => {setShowForm(true);setiscreate(true);}}>
                        + Thêm Album
                    </button>
                </div>

                <table className="album-table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Avatar</th>
                        <th>Tên Album</th>
                        <th>Tên Nghệ Sĩ</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentAlbums.map((album, index) => (
                            <tr key={album._id}>
                                <td>{startIndex + index + 1}</td> {/* Đảm bảo STT chính xác */}
                                <td>
                                    <img
                                        src={album.avatar || 'https://via.placeholder.com/60'}
                                        alt={'album avatar'}
                                        className="album-avatar"
                                    />
                                </td>
                                <td>{album.album_name}</td>
                                <td>{album.artist.name}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn btn-info" onClick={() => { handleViewDetails(album); setShowFormDetail(true); }}>Xem</button>
                                        <button className="btn btn-success" onClick={() => { handleAddSong(album); setShowFormAddSong(true); setAlbumId(album._id); }}>Thêm bài hát</button>
                                        <button className="btn btn-warning" onClick={() => { handleEditAlbum(album); setShowForm(true); setiscreate(false); setAlbumId(album._id); }}>Sửa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {totalPages > 1 && (
                            <div style={{marginTop: '20px', textAlign: 'center'}}>
                                {Array.from({length: totalPages}, (_, pageIndex) => (
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
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </tbody>

                </table>
            </div>

            {/* form add */}
            {showForm && (
                <div style={{
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
                    overflowY: 'scroll',
                    scrollbarWidth: 'none' as const,
                    msOverflowStyle: 'none' as const,
                }}>
                    <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                    }}>
                    <h2 style={{ margin: 0, textAlign: 'center' }}>
                        {iscreate ? 'Tạo album mới' : 'Chỉnh sửa album'}
                    </h2>

                    <input
                        type="text"
                        placeholder="Tên album"
                        value={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                        style={inputStyle}
                    />

                    <textarea
                        placeholder="Mô tả"
                        value={decription}
                        onChange={(e) => setDecription(e.target.value)}
                        rows={3}
                        style={inputStyle}
                    />

                    <input
                        type="date"
                        value={releaseDay}
                        onChange={(e) => setReleaseDay(e.target.value)}
                        style={inputStyle}
                    />

                    <select
                        value={artistId}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            setArtistId(selectedId);       
                            setSongIds([]);                
                            setdatasong(selectedId);    
                        }}
                        style={inputStyle}
                        >
                        <option value="">-- Chọn nghệ sĩ --</option>
                        {allAvailableArtist.map((artist) => (
                            <option key={artist._id} value={artist._id}>
                            {artist.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setAvatar(file);
                            setImagePreview(URL.createObjectURL(file));
                        }
                        }}
                        style={{ padding: '10px 0', fontSize: '16px' }}
                    />
                    {imagePreview && (
                        <img
                        src={imagePreview}
                        alt="preview"
                        style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginTop: '8px'
                        }}
                        />
                    )}

                    {/* Danh sách bài hát để chọn */}
                    {iscreate && (
                        <Select
                            isMulti
                            value={songOptions.filter(option => songIds.includes(option.value))}
                            onChange={(selectedOptions) => {
                                const selectedIds = (selectedOptions || []).map(option => option.value);
                                setSongIds(selectedIds);
                            }}
                            options={songOptions}
                        />
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button onClick={() => { setShowForm(false); clearForm(); }} style={cancelBtnStyle}>
                        Hủy
                        </button>
                        <button onClick={handleSaveAlbum} style={saveBtnStyle}>
                        Lưu
                        </button>
                    </div>
                    </div>
                </div>
                )}
            {/* form details */}
            {showFormDetail && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1010
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '90vh',           // Giới hạn chiều cao
                        overflowY: 'auto',           // Hiện thanh cuộn dọc nếu vượt quá
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                    <h2 style={{ margin: 0, textAlign: 'center' }}>
                        Chi tiết album
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '-5px' }}>
                        <p><strong>Ảnh đại diện:</strong></p>
                        {imagePreview && (
                            <img
                            src={imagePreview}
                            alt="preview"
                            style={{
                                width: '100%',
                                maxHeight: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginTop: '8px'
                            }}
                            />
                        )}
                        <p><strong>Tên album:</strong> {albumName}</p>
                        <p><strong>Mô tả:</strong> {decription}</p>
                        <p>
                            <strong>Ngày phát hành:</strong>{' '}
                            {releaseDay ? new Date(releaseDay).toLocaleDateString('vi-VN') : 'Không rõ'}
                        </p>
                        <p>
                            <strong>Nghệ sĩ:</strong> 
                            <table className="album-table">
                                <thead>
                                    <tr>
                                    <th>STT</th>
                                    <th>Avatar</th>
                                    <th>Tên nghệ sĩ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={artistForAlbum!._id}>
                                    <td>1</td> {/* STT cố định hoặc truyền từ props */}
                                    <td>
                                        <img
                                        src={artistForAlbum!.imageUrl || 'https://via.placeholder.com/60'}
                                        alt="album avatar"
                                        className="album-avatar"
                                        />
                                    </td>
                                    <td>{artistForAlbum!.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>

                        <div>
                                <strong>Bài hát:</strong>
                                <table className="album-table">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Avatar</th>
                                <th>Tên bài hát</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Render danh sách album từ state */}
                            {allAvailableSongs.map((song, index) => (
                                <tr key={song._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={song.avatar || 'https://via.placeholder.com/60'} // Ảnh mặc định nếu không có
                                            alt={'album avata'}
                                            className="album-avatar"
                                        />
                                    </td>
                                    <td>{song.title}</td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button onClick={() => { setShowFormDetail(false); clearForm(); }} style={cancelBtnStyle}>
                        Đóng
                        </button>
                    </div>
                    </div>
                </div>
                )}
            {/* form add song to album */}
            {showFormAddSong && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1010
                }}>
                    <div style={{
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '90vh',           // Giới hạn chiều cao
                        overflowY: 'auto',           // Hiện thanh cuộn dọc nếu vượt quá
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                    <h2 style={{ margin: 0, textAlign: 'center' }}>
                        Thêm bài hát vào album 
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '-5px' }}>
                        <p><strong>Tên album:</strong> {albumName}</p>
                        <p>
                            <strong>Nghệ sĩ:</strong> 
                            <table className="album-table">
                                <thead>
                                    <tr>
                                    <th>STT</th>
                                    <th>Avatar</th>
                                    <th>Tên nghệ sĩ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={artistForAlbum!._id}>
                                    <td>1</td> {/* STT cố định hoặc truyền từ props */}
                                    <td>
                                        <img
                                        src={artistForAlbum!.imageUrl || 'https://via.placeholder.com/60'}
                                        alt="album avatar"
                                        className="album-avatar"
                                        />
                                    </td>
                                    <td>{artistForAlbum!.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>

                        <div>
                    <strong>Bài hát:</strong>
                    <table className="album-table">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Tên bài hát</th>
                            <th>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allAvailableSongsRequest.map((song, index) => (
                            <tr key={song._id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                src={song.avatar || 'https://via.placeholder.com/60'}
                                alt="album avatar"
                                className="album-avatar"
                                style={{ width: '60px', borderRadius: '8px' }}
                                />
                            </td>
                            <td>{song.title}</td>
                            <td>
                                <button
                                onClick={() => {handleRemoveSong(song)}}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                                >
                                <FontAwesomeIcon
                                    icon={['fas',   'trash']}
                                    style={{
                                    color:  '#f44336',
                                    transition: 'transform 0.2s ease, color 0.2s ease',
                                    cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.2)';
                                    e.currentTarget.style.color =  '#b71c1c';
                                    }}
                                    onMouseLeave={(e) => {
                                    e.currentTarget.style.transform ='scale(1)';
                                    e.currentTarget.style.color = '#f44336';
                                    }}
                                />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    <Select
                            isMulti
                            value={songOptions.filter(option => songIds.includes(option.value))}
                            onChange={(selectedOptions) => {
                                const selectedIds = (selectedOptions || []).map(option => option.value);
                                const newlyAddedId = selectedIds.find(id => !songIds.includes(id));                                
                                if (newlyAddedId) {
                                    const newSong = allAvailableSongs.find(song => song._id === newlyAddedId);
                                    if (newSong) {
                                    setAllAvailableSongsRequest(prev => [...prev, newSong]);
                                    }
                                }

                                setSongIds(selectedIds);
                                }}
                            options={songOptions}
                            components={{
                                    MultiValue: () => null, 
                                    MultiValueRemove: () => null, 
                                    ClearIndicator: () => null, 
                                }}
                        />
                    </div>                   
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button onClick={() => { setShowFormAddSong(false); clearForm(); }} style={cancelBtnStyle}>
                        Đóng
                        </button>
                        <button onClick={()=> {handleSaveSong()}} style={saveBtnStyle}>
                        Lưu
                        </button>
                    </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default Album;