import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Artist = () => {
    const [showForm, setShowForm] = useState(false);
    const [artistName, setArtistName] = useState('');
    const [artistRole, setRoleArtist] = useState('Ca sĩ');
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [accounts, setAccounts] = useState(Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        name: `Vai trò ${i + 1}`,
        role: 'Ca sĩ',
        created: '2024-01-01',
        updated: '2024-05-01'
    })));
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 8;
    const totalPages = Math.ceil(accounts.length / accountsPerPage);
    const startIndex = currentPage * accountsPerPage;
    const currentAccounts = accounts.slice(startIndex, startIndex + accountsPerPage);

    const handleSave = () => {
        if (!artistName.trim()) return;
        const newAccount = {
            id: accounts.length + 1,
            name: artistName,
            role: artistRole,
            created: new Date().toISOString().split('T')[0],
            updated: new Date().toISOString().split('T')[0]
        };
        setAccounts([...accounts, newAccount]);
        alert(`Đã lưu nghệ sĩ: ${artistName}`);
        setArtistName('');
        setShowForm(false);
        setCurrentPage(Math.floor((accounts.length) / accountsPerPage)); // chuyển tới trang mới
    };

    const handleCancel = () => {
        setArtistName('');
        setShowForm(false);
    };


    return (
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
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Thêm nghệ sĩ
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '10% 30% 15% 15% 15% 15%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    backgroundColor: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Tên nghệ sĩ</div>
                    <div>Vai trò</div>
                    <div>Ngày tạo</div>
                    <div>Ngày cập nhật</div>
                    <div style={{textAlign: 'center'}}>Hành động</div>
                </div>

                {currentAccounts.map((account, index) => (
                    <div
                        key={account.id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '10% 30% 15% 15% 15% 15%',
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
                        <div>{account.name}</div>
                        <div>{account.role}</div>
                        <div>{account.created}</div>
                        <div>{account.updated}</div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            <button
                                disabled
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

                            <button
                                disabled
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
                                    icon={['fas', 'trash']}
                                    style={{
                                        color: '#f44336', // Màu đỏ
                                        transition: 'transform 0.2s ease, color 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.2)';
                                        e.currentTarget.style.color = '#b71c1c'; // Màu đỏ đậm khi hover
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
                            <h2 style={{margin: 0, textAlign: 'center'}}>Thêm nghệ sĩ</h2>
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

                            <select
                                value={artistRole}
                                onChange={(e) => setRoleArtist(e.target.value)}
                                style={{...inputStyle, cursor: 'pointer'}}
                            >
                                <option value="Ca sĩ">Ca sĩ</option>
                                <option value="Nhạc sĩ">Nhạc sĩ</option>
                            </select>

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