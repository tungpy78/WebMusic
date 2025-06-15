import React, { useState } from 'react';
import { MdVisibility, MdLock, MdLockOpen, MdDelete, MdRefresh } from 'react-icons/md';
import {create_account, getAccountDetail, post_status} from '../../Services/accountAdmin.service';
import { useEffect } from 'react';
import {ToastContainer, toast} from "react-toastify";

const Account = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState<any>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [viewingAccount, setViewingAccount] = useState<any>(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const getdata = await getAccountDetail();
                setAccounts(getdata);
                setGetformData(getdata);
            } catch (error) {
                console.error('Lỗi khi tải danh sách tài khoản:', error);
            }
        };

        fetchAccounts();
    }, []);

    type AccountType = {
        id: string;
        fullname: string;
        email: string;
        password: string;
        phone: string;
        status: string;
        deleted: string;
        role_name: string;
    };

    const [getformData, setGetformData] = useState({
       id: '',
       phone: '',
       password: '',
       role_name: '',
       fullname: '',
       email: '',
       status: '',
       delected: ''
    });

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: ''
    });
    console.log(accounts);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAccount = async () => {
        const { fullname, email, phone } = formData;

        try {
            setIsActionLoading(true);
            await create_account(fullname, email, phone);
            alert("Tạo tài khoản thành công!");
            setShowAddForm(false);
            setFormData({ fullname: '', email: '', phone: '' });
        } catch (error) {
            console.error("Lỗi khi tạo tài khoản:", error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleToggleStatus = async () => {
        try {
            setIsActionLoading(true);
            await post_status(getformData.id); // Gửi yêu cầu đổi trạng thái
            const updatedAccounts = await getAccountDetail(); // Lấy danh sách mới
            setAccounts(updatedAccounts); // Cập nhật danh sách
            const updatedForm = updatedAccounts.find((acc: AccountType) => acc.id === getformData.id);
            if (updatedForm) {
                setGetformData(updatedForm); // Cập nhật lại form nếu vẫn đang xem
            }
        } catch (error) {
            console.error("Lỗi khi đổi trạng thái:", error);
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <>
        <ToastContainer />
        <div style={{ width: '90%', maxHeight: '90%', margin: '0 auto', fontFamily: 'Arial' }}>
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2>Danh sách tài khoản</h2>
                    <button onClick={() => setShowAddForm(true)} style={addButtonStyle}>
                        Thêm tài khoản
                    </button>
                </div>

                {showAddForm && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Ngăn reload trang
                            handleAddAccount(); // Gọi hàm xử lý tạo tài khoản
                        }}
                        style={{
                            marginBottom: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                        }}
                    >
                        <h3>Thêm tài khoản mới</h3>

                        <input
                            type="text"
                            name="fullname"
                            placeholder="Họ và tên"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        />

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                marginTop: '10px',
                            }}
                        >
                            <button type="submit" style={saveButtonStyle} disabled={isActionLoading}>
                                Tạo tài khoản
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                style={cancelButtonStyle}
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                )}

                <div style={tableHeaderStyle}>
                    <div>STT</div>
                    <div>Tên tài khoản</div>
                    <div>Hành động</div>
                </div>

                {accounts.map((account, index) => (
                    <div key={account.id} style={tableRowStyle}>
                        <div>{index + 1}</div>
                        <div>{account.fullname}</div>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => setViewingAccount(account)}
                                style={{...iconButtonStyle, backgroundColor: 'transparent'}}
                            >
                                <MdVisibility title="Xem" size={20}/>
                            </button>
                            <button
                                onClick={handleToggleStatus}
                                disabled={isActionLoading}
                                style={iconButtonStyle}
                            >
                                {isActionLoading ? '...' : getformData.status === 'active'
                                    ? <MdLock title="Khóa tài khoản" size={20}/>
                                    : <MdLockOpen title="Mở khóa tài khoản" size={20}/>}
                            </button>

                            <button
                                onClick={() => setDeletingAccount(account)}
                                disabled={isActionLoading}
                                style={iconButtonStyle}
                            >
                                {isActionLoading ? '...' : <MdDelete title="Xóa" size={20}/>}
                            </button>
                            <button
                                onClick={() => alert("Reset mật khẩu")}
                                disabled={isActionLoading}
                                style={iconButtonStyle}
                            >
                                {isActionLoading ? '...' : <MdRefresh title="Reset mật khẩu" size={20}/>}
                            </button>
                        </div>
                    </div>
                ))}

                {deletingAccount && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '30px',
                            borderRadius: '8px',
                            width: '400px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    textAlign: 'center'}}>
                            <h3 style={{ margin: 0 }}>Xác nhận xóa</h3>
                            <p style={{ margin: '20px 0' }}>
                                Bạn có chắc muốn xóa tài khoản của "{deletingAccount.fullname}" không?
                            </p>
                            <div style={modalActionsStyle}>
                                <button onClick={() => setDeletingAccount(null)} style={cancelButtonStyle}>Không</button>
                                <button onClick={() => setDeletingAccount(null)} style={{ ...saveButtonStyle, backgroundColor: '#f44336' }}>
                                    Có, Xóa!
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {viewingAccount && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            background: 'linear-gradient(to bottom right, #fdfdfd, #f0f8ff)',
                            padding: '30px 25px',
                            borderRadius: '16px',
                            width: '420px',
                            boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
                            fontFamily: 'Arial, sans-serif',
                            position: 'relative',
                            animation: 'fadeIn 0.3s ease-in-out'
                        }}>
                            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>👤 Thông Tin Tài Khoản</h2>

                            <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#444' }}>
                                <p><strong>📛 Họ và tên:</strong> {viewingAccount.fullname}</p>
                                <p><strong>📧 Email:</strong> {viewingAccount.email}</p>
                                <p><strong>📞 Số điện thoại:</strong> {viewingAccount.phone}</p>
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '25px' }}>
                                <button
                                    onClick={() => setViewingAccount(null)}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#4CAF50',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                >
                                    Đóng lại
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

const infoRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '16px'
};

const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};
const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
};
const addButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};
const inputStyle = {
    display: 'block',
    width: '98%',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
};

const tableHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr 2fr',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    fontWeight: 'bold'
};

const tableRowStyle = {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr 2fr',
    padding: '10px',
    alignItems: 'center'
};

const iconButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
    padding: '5px'
};

const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px'
};
const cancelButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#cecece',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};
const saveButtonStyle = {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#388E3C'
};

export default Account;