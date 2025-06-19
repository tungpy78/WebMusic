import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { createArtist, getArtist, updateArtist } from '../../Services/artist.service';
import { ArtistRequest, ArtistType } from '../../models/artist.model';
import { ToastContainer, toast } from 'react-toastify';


const Artist = () => {
    const [showForm, setShowForm] = useState(false);
    const [artistId, setArtistId] = useState('');
    const [artistName, setArtistName] = useState('');
    const [artistBio, setBioArtist] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [iscreate, setiscreate] = useState<boolean>(false);
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [artist, setArtist] = useState<ArtistType[]>([])
     useEffect(() => {
                const fethApi = async () => {
                    try {
                        const result = await getArtist();
                        setArtist(result?.data);
                        console.error(result?.data);
                    } catch (error) {
                        console.log("errortopic", error);
                    }
                }
                fethApi();
            },[]);
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 8;
    const totalPages = Math.ceil(artist.length / accountsPerPage);
    const startIndex = currentPage * accountsPerPage;
    const currentAccounts = artist.slice(startIndex, startIndex + accountsPerPage);

    const handleSave = async() => {
        if (!artistName.trim()) return;
        const newArtist : ArtistRequest = {
            name: artistName,
            bio: artistBio,
            fileAvata: imageFile,
        };
        try {
            if(iscreate){
                await createArtist(newArtist);
                toast('Tạo thành công!');
            }else{
                
                await updateArtist(artistId,newArtist);
                toast('update thành công!');
            }
            const updatedResult = await getArtist();
            setArtist(updatedResult.data);
            setArtistId('');
            setArtistName('');
            setBioArtist('');
            setImageFile(null);
            setImagePreview(null);
            setShowForm(false);
            setiscreate(false);
            setCurrentPage(Math.floor(artist.length / accountsPerPage));
        } catch (err) {
            console.error(err);
            toast('Tạo thất bại:' + err);
        }
    };

    const handleCancel = () => {
        setArtistId('');
        setArtistName('');
        setBioArtist('');
        setImageFile(null);
        setImagePreview(null);
        setShowForm(false);
    };

    const handleEditClick = (artist: ArtistType) => {
        setShowForm(true);
        setArtistName(artist.name);
        setBioArtist(artist.bio);
        setImagePreview(artist.imageUrl)
    };


    return (
        <>
        <ToastContainer/>
        <div style={{width: '90%', maxHeight: '90%'}}>
            <div style={{
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2>Danh sách nghệ sĩ</h2>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setiscreate(true);
                            }}
                        onMouseEnter={() => setIsHoveringAdd(true)}
                        onMouseLeave={() => setIsHoveringAdd(false)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: isHoveringAdd ? '#45a049' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Thêm nghệ sĩ
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '8% 15% 25% 25% 27%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    backgroundColor: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Hình ảnh</div>
                    <div>Tên nghệ sĩ</div>
                    <div>Thông Tin</div>
                    <div style={{textAlign: 'center'}}>Hành động</div>
                </div>

                {currentAccounts.map((artist, index) => (
                    <div
                        key={artist._id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '8% 15% 25% 25% 27%',
                            padding: '12px 16px',
                            backgroundColor: '#fff',
                            marginBottom: '8px',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            alignItems: 'center',
                            transition: 'background-color 0.2s',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                        <div>{startIndex + index + 1}</div>
                        <div>
                            <img
                                src={artist.imageUrl || 'https://via.placeholder.com/60'} // fallback nếu không có ảnh
                                alt="avatar"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div>{artist.name}</div>
                        <div>{artist.bio}</div>   
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            <button
                                onClick={() => {handleEditClick(artist);setiscreate(false);setArtistId(artist._id)}}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '8px'
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={['fas', 'pen']}
                                    style={{
                                        color: '#2196F3', // Màu xanh cho chỉnh sửa
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#0d47a1'; // Màu đậm hơn khi hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = '#2196F3'; // Trở về màu cũ
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
                                    cursor: 'pointer'
                                }}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                )}

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
                        zIndex: 1010
                    }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '500px',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <h2 style={{margin: 0, textAlign: 'center'}}>{iscreate ? 'Tạo nghệ sĩ mới' : 'Chỉnh sửa nghệ sĩ'}</h2>
                            <input
                                type="text"
                                placeholder="Nhập tên nghệ sĩ"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />

                            <input
                                type="text"
                                placeholder="Mô tả"
                                value={artistBio}
                                onChange={(e) => setBioArtist(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setImageFile(file);
                                        setImagePreview(URL.createObjectURL(file)); 
                                    }
                                }}
                                style={{
                                    padding: '10px 0',
                                    fontSize: '16px'
                                }}
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
                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                                <button onClick={handleCancel} style={{
                                    padding: '10px 18px',
                                    backgroundColor: '#e0e0e0',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}>
                                    Hủy
                                </button>
                                <button onClick={handleSave} style={{
                                    padding: '10px 18px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '15px',
                                    cursor: 'pointer'
                                }}>
                                    Lưu
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

const inputStyle = {
    padding: '10px 14px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
};

export default Artist;