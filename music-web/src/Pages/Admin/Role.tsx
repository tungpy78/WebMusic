import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getRole} from "../../Services/role.service";

type Role = {
    id: number;
    name: string;
    created: string;
    updated: string;
};

const Role = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await getRole();
                setRoles(res.data);
            } catch (err) {
                console.error("Lỗi là:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, []);
    

    const [showForm, setShowForm] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [roles, setRoles] = useState<Role[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const rolesPerPage = 8;
    const totalPages = Math.ceil(roles.length / rolesPerPage);
    const startIndex = currentPage * rolesPerPage;
    const currentRoles = roles.slice(startIndex, startIndex + rolesPerPage);

    const handleSave = () => {
        if (!roleName.trim()) return;
        const newRole = {
            id: roles.length + 1,
            name: roleName,
            created: new Date().toISOString().split('T')[0],
            updated: new Date().toISOString().split('T')[0]
        };
        setRoles([...roles, newRole]);
        alert(`Đã lưu vai trò: ${roleName}`);
        setRoleName('');
        setShowForm(false);
        setCurrentPage(Math.floor((roles.length) / rolesPerPage)); // chuyển tới trang mới
    };

    const handleCancel = () => {
        setRoleName('');
        setShowForm(false);
    };

    return (
        <div style={{ width: '90%', maxHeight: '90%'}}>
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
                    <h2>Danh sách vai trò</h2>
                    <button
                        onClick={() => setShowForm(true)}
                        disabled
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            opacity: 0.6,               // hiệu ứng mờ đi
                            cursor: 'not-allowed'       // con trỏ không cho click
                        }}
                    >
                        Thêm vai trò
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '10% 30% 20% 20% 20%',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    backgroundColor: '#f1f1f1',
                    borderBottom: '2px solid #ddd',
                    borderRadius: '8px 8px 0 0'
                }}>
                    <div>STT</div>
                    <div>Tên vai trò</div>
                    <div>Ngày tạo</div>
                    <div>Ngày cập nhật</div>
                    <div style={{textAlign: 'center'}}>Hành động</div>
                </div>

                {currentRoles.map((role, index) => (
                    <div
                        key={role.id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '10% 30% 20% 20% 20%',
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
                        <div>{role.name}</div>
                        <div>{role.created}</div>
                        <div>{role.updated}</div>
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                            <button
                                disabled
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#ccc',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'not-allowed',
                                    opacity: 0.6,
                                    marginRight: '8px'
                                }}
                            >
                                <FontAwesomeIcon icon={['fas', 'pen']}
                                                 style={{
                                                     //cursor: 'pointer',
                                                     transition: 'transform 0.2s ease, color 0.2s ease'
                                                 }}
                                                 onMouseEnter={(e) => {
                                                     e.currentTarget.style.transform = 'scale(1.2)';
                                                 }}
                                                 onMouseLeave={(e) => {
                                                     e.currentTarget.style.transform = 'scale(1)';
                                                 }}
                                />
                            </button>

                            <button
                                disabled
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#ccc',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'not-allowed',
                                    opacity: 0.6,
                                    marginRight: '8px'
                                }}
                            >
                                <FontAwesomeIcon icon={['fas', 'trash']}
                                                 style={{
                                                     //cursor: 'pointer',
                                                     transition: 'transform 0.2s ease, color 0.2s ease'
                                                 }}
                                                 onMouseEnter={(e) => {
                                                     e.currentTarget.style.transform = 'scale(1.2)';
                                                 }}
                                                 onMouseLeave={(e) => {
                                                     e.currentTarget.style.transform = 'scale(1)';
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
                            <h2 style={{ margin: 0, textAlign: 'center' }}>Tạo mới vai trò</h2>
                            <input
                                type="text"
                                placeholder="Nhập tên vai trò"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '16px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    outline: 'none',
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
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

export default Role;
