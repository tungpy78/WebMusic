import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRole } from "../../Services/role.service";

type Role = {
    id: number;
    name: string;
    created: string;
    updated: string;
};

const Role = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchRoles = async () => {
        try {
        const res = await getRole();
        console.log("Kết quả API getRole:", res); // Xem có phải mảng không

        // Kiểm tra dữ liệu là mảng, sau đó map sang state
        if (Array.isArray(res)) {
            const mapped = res.map((item: any) => ({
            id: item._id,
            name: item.role_name,
            created: new Date(item.created_at).toLocaleDateString(),
            updated: new Date(item.updated_at).toLocaleDateString(),
            }));
            setRoles(mapped);
        } else {
            console.error("API không trả về mảng:", res);
        }
        } catch (err) {
            console.error("Lỗi khi gọi API getRole:", err);
            setError("Không thể tải danh sách vai trò");
        } finally {
            setLoading(false);
        }
    };
    fetchRoles();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const rolesPerPage = 8;
    const totalPages = Math.ceil(roles.length / rolesPerPage);
    const startIndex = currentPage * rolesPerPage;
    const currentRoles = roles.slice(startIndex, startIndex + rolesPerPage);

    return (
        <div style={{ width: '90%', maxHeight: '90%' }}>
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
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '10% 30% 30% 30%',
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
                </div>

                {currentRoles.map((role, index) => (
                    <div
                        key={role.id}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '10% 30% 30% 30%',
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

export default Role;