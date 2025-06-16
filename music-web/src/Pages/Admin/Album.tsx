import React, { useState } from 'react';

// =================================================================
// === PHẦN 1: ĐỊNH NGHĨA KIỂU DỮ LIỆU & CSS (TYPES & STYLES) ========
// =================================================================

// --- Component chứa Style CSS (Đã được bổ sung style cho Modal và Form) ---
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


// --- Định nghĩa kiểu dữ liệu (Đã được mở rộng) ---
interface SongType {
    id: number;
    name: string;
    artist: string;
}

interface AlbumType {
    id: number;
    name: string;
    artist: string;
    avatarUrl: string;
    description?: string;
    releaseDate?: string;
    songs?: SongType[];
}


// =================================================================
// === PHẦN 2: DỮ LIỆU GIẢ (MOCK DATA) ============================
// =================================================================

const initialMockAlbums: AlbumType[] = [
    { id: 1, name: 'Trạm Cảm Xúc', artist: 'Hoàng Dũng', avatarUrl: 'https://i.scdn.co/image/ab67616d0000b2737c39049a4604b7b2520550c3' },
    { id: 2, name: 'dreAMEE', artist: 'AMEE', avatarUrl: 'https://i.scdn.co/image/ab67616d0000b273d49265147c21e3d64993132d' },
    { id: 3, name: '25', artist: 'Hoàng Dũng', avatarUrl: 'https://i.scdn.co/image/ab67616d0000b2731833e72082b2d0752a78f5f1' },
    { id: 4, name: 'Lof-Fi', artist: 'Nhiều nghệ sĩ', avatarUrl: 'https://i.scdn.co/image/ab67706c0000da845cf45347f0354b6732766624' },
];

const allAvailableSongs: SongType[] = [
    { id: 101, name: "Nàng Thơ", artist: "Hoàng Dũng" },
    { id: 102, name: "Đoạn Kết Mới", artist: "Hoàng Dũng" },
    { id: 103, name: "Anh Đã Quen Với Cô Đơn", artist: "Soobin Hoàng Sơn" },
    { id: 104, name: "Tình Yêu Màu Nắng", artist: "Đoàn Thúy Trang" },
    { id: 105, name: "Ex's Hate Me", artist: "B Ray, AMEE" },
    { id: 106, name: "Anh Nhà Ở Đâu Thế", artist: "AMEE" },
];


// =================================================================
// === PHẦN 3: COMPONENT MODAL THÊM ALBUM (AddAlbumModal) ==========
// =================================================================

interface AddAlbumModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newAlbumData: Omit<AlbumType, 'id'>) => void;
}

const AddAlbumModal = ({ isOpen, onClose, onSave }: AddAlbumModalProps): React.JSX.Element | null => {
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [selectedSongs, setSelectedSongs] = useState<SongType[]>([]);
    const [isSongDropdownOpen, setIsSongDropdownOpen] = useState(false);

    if (!isOpen) return null;

    const handleSongToggle = (song: SongType) => {
        if (selectedSongs.some(s => s.id === song.id)) {
            setSelectedSongs(selectedSongs.filter(s => s.id !== song.id));
        } else {
            setSelectedSongs([...selectedSongs, song]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !artist) {
            alert('Vui lòng điền Tên Album và Tên Nghệ sĩ!');
            return;
        }
        onSave({ name, artist, avatarUrl, description, releaseDate, songs: selectedSongs });
        setName(''); setArtist(''); setAvatarUrl(''); setDescription(''); setReleaseDate(''); setSelectedSongs([]);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-header"><h3>Thêm Album Mới</h3></div>
                    <div className="modal-body">
                        <div className="form-group"><label>Tên Album*</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                        <div className="form-group"><label>Tên Nghệ Sĩ*</label><input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required /></div>
                        <div className="form-group"><label>Link Avatar</label><input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} /></div>
                        <div className="form-group"><label>Mô tả</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}></textarea></div>
                        <div className="form-group"><label>Ngày Ra Mắt</label><input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /></div>
                        <div className="form-group">
                            <label>Chọn Bài Hát</label>
                            <div className="custom-select-container">
                                <div className="select-input" onClick={() => setIsSongDropdownOpen(!isSongDropdownOpen)}>
                                    {selectedSongs.length === 0 && <span style={{color: '#888'}}>Nhấn để chọn bài hát...</span>}
                                    {selectedSongs.map(song => (
                                        <span key={song.id} className="selected-song-pill">
                                            {song.name}
                                            <span className="pill-remove-btn" onClick={(e) => { e.stopPropagation(); handleSongToggle(song); }}>×</span>
                                        </span>
                                    ))}
                                </div>
                                {isSongDropdownOpen && (
                                    <div className="select-dropdown">
                                        {allAvailableSongs.map(song => (
                                            <div key={song.id} className={`select-dropdown-item ${selectedSongs.some(s => s.id === song.id) ? 'selected' : ''}`} onClick={() => handleSongToggle(song)}>
                                                {song.name} - <em style={{fontSize: '0.9em', color: '#666'}}>{song.artist}</em>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// =================================================================
// === PHẦN 4: COMPONENT CHÍNH (ALBUM) =============================
// =================================================================

const Album = (): React.JSX.Element => {
    // State để quản lý danh sách album và trạng thái modal
    const [albums, setAlbums] = useState<AlbumType[]>(initialMockAlbums);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Hàm xử lý khi lưu album mới từ modal
    const handleSaveAlbum = (newAlbumData: Omit<AlbumType, 'id'>) => {
        const newAlbum: AlbumType = {
            id: Date.now(), // Tạo ID duy nhất bằng timestamp
            ...newAlbumData,
        };
        setAlbums(prevAlbums => [newAlbum, ...prevAlbums]);
        setIsModalOpen(false);
        alert(`Đã thêm thành công album "${newAlbum.name}"!`);
    };

    // Các hàm xử lý sự kiện cũ
    const handleViewDetails = (albumId: number) => alert(`Xem chi tiết album ID = ${albumId}`);
    const handleAddSong = (albumId: number) => alert(`Thêm bài hát vào album ID = ${albumId}`);
    const handleEditAlbum = (albumId: number) => alert(`Sửa album ID = ${albumId}`);

    return (
        <>
            <AlbumStyles />
            <AddAlbumModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAlbum}
            />

            <div className="album-container">
                <div className="album-header">
                    <h2>Quản lý Album</h2>
                    {/* Nút này bây giờ sẽ mở modal */}
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
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
                    {/* Render danh sách album từ state */}
                    {albums.map((album, index) => (
                        <tr key={album.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={album.avatarUrl || 'https://via.placeholder.com/60'} // Ảnh mặc định nếu không có
                                    alt={album.name}
                                    className="album-avatar"
                                />
                            </td>
                            <td>{album.name}</td>
                            <td>{album.artist}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="btn btn-info" onClick={() => handleViewDetails(album.id)}>Xem</button>
                                    <button className="btn btn-success" onClick={() => handleAddSong(album.id)}>Thêm bài hát</button>
                                    <button className="btn btn-warning" onClick={() => handleEditAlbum(album.id)}>Sửa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Album;