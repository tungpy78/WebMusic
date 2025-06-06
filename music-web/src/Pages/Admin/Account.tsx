import React, { useState } from 'react';

const Account = () => {
    const [showForm, setShowForm] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Người nghe');
    const [isHoveringAdd, setIsHoveringAdd] = useState(false);
    const [account, setAccount] = useState(Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        username: `Vai trò ${i + 1}`,
        password: `Mật khẩu${i + 1}`,
        created: '2024-01-01'
    })));
    const [currentPage, setCurrentPage] = useState(0);
    const rolesPerPage = 8;
    const totalPages = Math.ceil(account.length / rolesPerPage);
    const startIndex = currentPage * rolesPerPage;
    const currentRoles = account.slice(startIndex, startIndex + rolesPerPage);

    const handleSave = () => {
        if (!accountName.trim() || !password.trim() || !email.trim()) return;
        const newAccount = {
            id: account.length + 1,
            username: accountName,
            password: password,
            email: email,
            role: role,
            created: new Date().toISOString().split('T')[0]
        };
        setAccount([...account, newAccount]);
        setShowForm(false);
        setAccountName('');
        setPassword('');
        setEmail('');
        setRole('Người nghe');
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div style={{ width: '90%', maxHeight: '90%', margin: '0 auto' }}>
            <div style={{
                width: '100%',
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
                    <h2>Danh sách tài khoản</h2>
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
                        Thêm tài khoản
                    </button>

                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '10% 30% 20% 20% 20%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    background: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Tên tài khoản</div>
                    <div>Mật khẩu</div>
                    <div>Ngày tạo</div>
                    <div>Hành động</div>
                </div>

                {currentRoles.map((item, index) => (
                    <div key={item.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '10% 30% 20% 20% 20%',
                        padding: '10px 16px',
                        borderBottom: '1px solid #eee',
                        alignItems: 'center'
                    }}>
                        <div>{startIndex + index + 1}</div>
                        <div>{item.username}</div>
                        <div>{item.password}</div>
                        <div>{item.created}</div>
                        <div>
                            <button style={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>Khóa</button>
                        </div>
                    </div>
                ))}

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
                            <h2 style={{margin: 0, textAlign: 'center'}}>Tạo mới tài khoản</h2>

                            <input
                                type="text"
                                placeholder="Nhập tên tài khoản"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                style={inputStyle}
                            />

                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                            />

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{...inputStyle, cursor: 'pointer'}}
                            >
                                <option value="Người nghe">Người nghe</option>
                                <option value="Người quản lý">Người quản lý</option>
                            </select>

                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                                <button onClick={handleCancel} style={cancelButtonStyle}>Hủy</button>
                                <button onClick={handleSave} style={saveButtonStyle}>Lưu</button>
                            </div>
                        </div>
                    </div>
                )}

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

const cancelButtonStyle = {
    padding: '10px 18px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer'
};

const saveButtonStyle = {
    padding: '10px 18px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer'
};

export default Account;
