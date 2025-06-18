import React, { JSX, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    getAllSong,
    create_song,
    update_song,
    delete_song,
    getAllSongAdmin,
    restore_song
} from '../../Services/song.service';
import { getArtist } from '../../Services/artist.service';
import { getTopic } from '../../Services/topic.service';
import {toast, ToastContainer} from "react-toastify";

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
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formattedLyrics, setFormattedLyrics] = useState<JSX.Element | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const createAvatarInputRef = useRef<HTMLInputElement>(null);
    const createAudioInputRef = useRef<HTMLInputElement>(null);
    const updateAvatarInputRef = useRef<HTMLInputElement>(null);
    const updateAudioInputRef = useRef<HTMLInputElement>(null);

    // Form state cho thêm bài hát
    const [createFormData, setCreateFormData] = useState({
        title: '',
        description: '',
        lyrics: '',
        artistIds: [] as string[],
        genreId: '',
        avatarFile: null as File | null,
        audioFile: null as File | null,
    });

    // Form state cho sửa bài hát
    const [updateFormData, setUpdateFormData] = useState({
        title: '',
        description: '',
        lyrics: '',
        artistIds: [] as string[],
        genreId: '',
        avatarFile: null as File | null,
        audioFile: null as File | null,
        currentAvatar: '',
        currentAudio: '',
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const songsPerPage = 8;
    const totalPages = Math.ceil(songs.length / songsPerPage);
    const startIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(startIndex, startIndex + songsPerPage);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [songsResponse, artistsResponse, genresResponse] = await Promise.all([
                    getAllSongAdmin(),
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
    }, [showUpdateForm]);

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setFormData: React.Dispatch<React.SetStateAction<any>>
    ) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleInputChange2 = (
        e: React.ChangeEvent<HTMLSelectElement>,
        setFormData: React.Dispatch<React.SetStateAction<any>>
    ) => {
        const { name, value, multiple, selectedOptions } = e.target;
        if (multiple) {
            const values = Array.from(selectedOptions).map((option) => option.value);
            setFormData((prev: any) => ({
                ...prev,
                [name]: values,
            }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFormData: React.Dispatch<React.SetStateAction<any>>
    ) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            if (name === 'avatarFile' && !file.type.startsWith('image/')) {
                toast('Vui lòng chọn file ảnh hợp lệ.');
                return;
            }
            if (name === 'audioFile' && !file.type.startsWith('audio/')) {
                toast('Vui lòng chọn file âm thanh hợp lệ.');
                return;
            }
            setFormData((prev: any) => ({ ...prev, [name]: file }));
        }
    };

    const handleEdit = (song: Song) => {
        setUpdateFormData({
            title: song.title,
            description: song.description || '',
            lyrics: song.lyrics || '',
            artistIds: song.artist.map((a) => a._id),
            genreId: song.genre._id,
            avatarFile: null,
            audioFile: null,
            currentAvatar: song.avatar,
            currentAudio: song.audio,
        });
        setSelectedSong(song);
        setShowUpdateForm(true);
    };

    const handleCreateSave = async () => {
        if (isSaving) return;

        if (!createFormData.title.trim() || !createFormData.genreId || createFormData.artistIds.length === 0) {
            toast('Vui lòng nhập đầy đủ tên bài hát, thể loại, và ít nhất một nghệ sĩ.');
            return;
        }

        if (!createFormData.audioFile || !createFormData.avatarFile) {
            toast('Vui lòng chọn đầy đủ file nhạc và ảnh.');
            return;
        }

        setIsSaving(true);
        try {
            const newSong = await create_song(
                createFormData.audioFile,
                createFormData.title,
                createFormData.genreId,
                createFormData.avatarFile,
                createFormData.description,
                createFormData.lyrics,
                createFormData.artistIds
            );
            setSongs([...songs, newSong.data]);
            toast(`Đã thêm bài hát: ${createFormData.title}`);
            setCreateFormData({
                title: '',
                description: '',
                lyrics: '',
                artistIds: [],
                genreId: '',
                avatarFile: null,
                audioFile: null,
            });
            if (createAvatarInputRef.current) createAvatarInputRef.current.value = '';
            if (createAudioInputRef.current) createAudioInputRef.current.value = '';
            setShowCreateForm(false);
            setCurrentPage(Math.floor((songs.length) / songsPerPage));
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Lỗi khi thêm bài hát.';
            toast(errorMessage);
            console.error('Lỗi:', error.response?.data || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdateSave = async () => {
        if (isSaving) return;

        if (!updateFormData.title.trim() || !updateFormData.genreId || updateFormData.artistIds.length === 0) {
            toast('Vui lòng nhập đầy đủ tên bài hát, thể loại, và ít nhất một nghệ sĩ.');
            return;
        }

        setIsSaving(true);
        try {
            if (selectedSong) {
                const updatedSong = await update_song(
                    selectedSong._id,
                    updateFormData.audioFile,
                    updateFormData.title,
                    updateFormData.genreId,
                    updateFormData.avatarFile,
                    updateFormData.description,
                    updateFormData.lyrics,
                    updateFormData.artistIds
                );
                setSongs(songs.map((song) => (song._id === selectedSong._id ? updatedSong.data : song)));
                toast(`Đã cập nhật bài hát: ${updateFormData.title}`);
                setUpdateFormData({
                    title: '',
                    description: '',
                    lyrics: '',
                    artistIds: [],
                    genreId: '',
                    avatarFile: null,
                    audioFile: null,
                    currentAvatar: '',
                    currentAudio: '',
                });
                if (updateAvatarInputRef.current) updateAvatarInputRef.current.value = '';
                if (updateAudioInputRef.current) updateAudioInputRef.current.value = '';
                setShowUpdateForm(false);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Lỗi khi cập nhật bài hát.';
            toast(errorMessage);
            console.error('Lỗi:', error.response?.data || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateCancel = () => {
        setCreateFormData({
            title: '',
            description: '',
            lyrics: '',
            artistIds: [],
            genreId: '',
            avatarFile: null,
            audioFile: null,
        });
        if (createAvatarInputRef.current) createAvatarInputRef.current.value = '';
        if (createAudioInputRef.current) createAudioInputRef.current.value = '';
        setShowCreateForm(false);
    };

    const handleUpdateCancel = () => {
        setUpdateFormData({
            title: '',
            description: '',
            lyrics: '',
            artistIds: [],
            genreId: '',
            avatarFile: null,
            audioFile: null,
            currentAvatar: '',
            currentAudio: '',
        });
        if (updateAvatarInputRef.current) updateAvatarInputRef.current.value = '';
        if (updateAudioInputRef.current) updateAudioInputRef.current.value = '';
        setShowUpdateForm(false);
    };

    const handleLyricsFormatting = (
        e: React.FormEvent<HTMLTextAreaElement>,
        setFormData: React.Dispatch<React.SetStateAction<any>>
    ) => {
        const text = e.currentTarget.value;
        setFormData((prev: any) => ({ ...prev, lyrics: text }));
        const paragraphs = text
            .trim()
            .split(/\n\s*\n/)
            .map((para, i) => (
                <p key={i}>
                    {para.split('\n').map((line, j) => (
                        <React.Fragment key={j}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            ));
        setFormattedLyrics(<div>{paragraphs}</div>);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
    }

    const formStyle = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1010,
    };

    const formContentStyle = {
        width: '100%',
        maxWidth: '500px',
        height: '85%',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
        overflowY: 'scroll' as const,
        scrollbarWidth: 'none' as const,
        msOverflowStyle: 'none' as const,
    };

    const inputStyle = {
        padding: '10px 14px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
    };

    const selectStyle = {
        padding: '10px 14px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        width: '100%',
    };

    const buttonStyle = {
        padding: '10px 18px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '15px',
        cursor: 'pointer',
    };

    const deletedOrRestore = async (songId: string, isDeleted: boolean) => {
        try {
            if (isDeleted) {
                await restore_song(songId);
                toast('Đã khôi phục bài hát.');
            } else {
                await delete_song(songId);
                toast('Đã xóa bài hát.');
            }

            setSongs((prevSongs) =>
                prevSongs.map((song) =>
                    song._id === songId ? { ...song, deleted: !isDeleted } : song
                )
            );
        } catch (error) {
            console.error('Lỗi khi xóa/khôi phục bài hát:', error);
            toast('Xảy ra lỗi khi xử lý bài hát.');
        }
    };

    return (
        <>
        <ToastContainer />
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
                        onClick={() => setShowCreateForm(true)}
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
                        <div style={{display: 'flex', justifyContent: 'center', gap: '4px'}}>
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
                                onClick={() => handleEdit(song)}
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
                                onClick={() => deletedOrRestore(song._id, song.deleted)}
                                style={{
                                    padding: '6px 6px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', song.deleted ? 'undo' : 'trash']}
                                    style={{
                                        color: song.deleted ? '#1976d2' : '#f44336',
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = song.deleted ? '#0d47a1' : '#b71c1c';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = song.deleted ? '#1976d2' : '#f44336';
                                    }}
                                />
                            </button>
                        </div>
                    </div>
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
                                    cursor: 'pointer',
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                )}

                {showCreateForm && (
                    <div style={formStyle}>
                        <div style={formContentStyle}>
                            <h2 style={{ margin: 0, textAlign: 'center' }}>Thêm bài hát</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Nhập tên bài hát"
                                value={createFormData.title}
                                onChange={(e) => handleInputChange(e, setCreateFormData)}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Nhập mô tả"
                                value={createFormData.description}
                                onChange={(e) => handleInputChange(e, setCreateFormData)}
                                style={inputStyle}
                            />
                            <textarea
                                name="lyrics"
                                placeholder="Nhập lời bài hát"
                                value={createFormData.lyrics}
                                onChange={(e) => handleInputChange(e, setCreateFormData)}
                                onInput={(e) => handleLyricsFormatting(e, setCreateFormData)}
                                style={{ ...inputStyle, minHeight: '100px' }}
                            />
                            <div>
                                <select
                                    name="artistIds"
                                    value={createFormData.artistIds}
                                    onChange={(e) => handleInputChange2(e, setCreateFormData)}
                                    multiple
                                    style={{ ...selectStyle, height: '150px' }}
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
                                {createFormData.artistIds.length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <strong>Đã chọn:</strong>{' '}
                                        {artists
                                            .filter((artist) => createFormData.artistIds.includes(artist._id))
                                            .map((artist) => artist.name)
                                            .join(', ')}
                                    </div>
                                )}
                            </div>
                            <select
                                name="genreId"
                                value={createFormData.genreId}
                                onChange={(e) => handleInputChange2(e, setCreateFormData)}
                                style={selectStyle}
                                required
                            >
                                <option value="">Chọn thể loại</option>
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.title}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="createAvatarInput" style={{ display: 'block', marginBottom: '0px' }}>
                                Ảnh bài hát:
                            </label>
                            <input
                                type="file"
                                name="avatarFile"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setCreateFormData)}
                                ref={createAvatarInputRef}
                                style={inputStyle}
                                required
                            />
                            <label htmlFor="createAudioInput" style={{ display: 'block', marginBottom: '0px' }}>
                                File bài hát:
                            </label>
                            <input
                                type="file"
                                name="audioFile"
                                accept="audio/*"
                                onChange={(e) => handleFileChange(e, setCreateFormData)}
                                ref={createAudioInputRef}
                                style={inputStyle}
                                required
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    onClick={handleCreateCancel}
                                    disabled={isSaving}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: isSaving ? '#ccc' : '#e0e0e0',
                                        cursor: isSaving ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleCreateSave}
                                    disabled={isSaving}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: isSaving ? '#ccc' : '#4CAF50',
                                        color: 'white',
                                        cursor: isSaving ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {isSaving ? 'Đang lưu...' : 'Lưu'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showUpdateForm && (
                    <div style={formStyle}>
                        <div style={formContentStyle}>
                            <h2 style={{ margin: 0, textAlign: 'center' }}>Sửa bài hát</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Nhập tên bài hát"
                                value={updateFormData.title}
                                onChange={(e) => handleInputChange(e, setUpdateFormData)}
                                style={inputStyle}
                                required
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Nhập mô tả"
                                value={updateFormData.description}
                                onChange={(e) => handleInputChange(e, setUpdateFormData)}
                                style={inputStyle}
                            />
                            <textarea
                                name="lyrics"
                                placeholder="Nhập lời bài hát"
                                value={updateFormData.lyrics}
                                onChange={(e) => handleInputChange(e, setUpdateFormData)}
                                onInput={(e) => handleLyricsFormatting(e, setUpdateFormData)}
                                style={{ ...inputStyle, minHeight: '100px' }}
                            />
                            <div>
                                <select
                                    name="artistIds"
                                    value={updateFormData.artistIds}
                                    onChange={(e) => handleInputChange2(e, setUpdateFormData)}
                                    multiple
                                    style={{ ...selectStyle, height: '150px' }}
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
                                {updateFormData.artistIds.length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <strong>Đã chọn:</strong>{' '}
                                        {artists
                                            .filter((artist) => updateFormData.artistIds.includes(artist._id))
                                            .map((artist) => artist.name)
                                            .join(', ')}
                                    </div>
                                )}
                            </div>
                            <select
                                name="genreId"
                                value={updateFormData.genreId}
                                onChange={(e) => handleInputChange2(e, setUpdateFormData)}
                                style={selectStyle}
                                required
                            >
                                <option value="">Chọn thể loại</option>
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.title}
                                    </option>
                                ))}
                            </select>
                            {updateFormData.currentAvatar && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px' }}>
                                        Ảnh hiện tại:
                                    </label>
                                    <img
                                        src={updateFormData.currentAvatar}
                                        alt="Avatar hiện tại"
                                        style={{
                                            maxWidth: '150px',
                                            borderRadius: '6px',
                                            marginBottom: '8px',
                                        }}
                                        onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                                    />
                                    <a
                                        href={updateFormData.currentAvatar}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                                    >
                                        Xem link ảnh
                                    </a>
                                </div>
                            )}
                            <label htmlFor="updateAvatarInput" style={{ display: 'block', marginBottom: '0px' }}>
                                Thay đổi ảnh bài hát (tùy chọn):
                            </label>
                            <input
                                type="file"
                                name="avatarFile"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, setUpdateFormData)}
                                ref={updateAvatarInputRef}
                                style={inputStyle}
                            />
                            {updateFormData.currentAudio && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px' }}>
                                        File âm thanh hiện tại:
                                    </label>
                                    <a
                                        href={updateFormData.currentAudio}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#1976d2', textDecoration: 'underline' }}
                                    >
                                        Nghe file âm thanh
                                    </a>
                                </div>
                            )}
                            <label htmlFor="updateAudioInput" style={{ display: 'block', marginBottom: '0px' }}>
                                Thay đổi file bài hát (tùy chọn):
                            </label>
                            <input
                                type="file"
                                name="audioFile"
                                accept="audio/*"
                                onChange={(e) => handleFileChange(e, setUpdateFormData)}
                                ref={updateAudioInputRef}
                                style={inputStyle}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    onClick={handleUpdateCancel}
                                    disabled={isSaving}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: isSaving ? '#ccc' : '#e0e0e0',
                                        cursor: isSaving ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleUpdateSave}
                                    disabled={isSaving}
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: isSaving ? '#ccc' : '#4CAF50',
                                        color: 'white',
                                        cursor: isSaving ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {isSaving ? 'Đang lưu...' : 'Lưu'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDetailModal && selectedSong && (
                    <div style={formStyle}>
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
                                flexDirection: 'column' as const,
                                gap: '1px',
                                overflowY: 'scroll' as const,
                                scrollbarWidth: 'none' as const,
                                msOverflowStyle: 'none' as const,
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
                                        ...buttonStyle,
                                        backgroundColor: '#e0e0e0',
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
        </>
    );
};

export default Songs;