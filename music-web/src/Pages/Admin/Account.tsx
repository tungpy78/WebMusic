import React, { useState, useEffect } from 'react';
import { MdVisibility, MdLock, MdLockOpen, MdRefresh } from 'react-icons/md';
import { create_account, getAccountDetail, post_status, reset_pass } from '../../Services/accountAdmin.service';
import { ToastContainer, toast } from 'react-toastify';

// Define interfaces for account and form data
interface Account {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    status: boolean;
    deleted: boolean;
    role_name: string;
    password?: string;
}

interface FormData {
    fullname: string;
    email: string;
    phone: string;
}

interface GetFormData {
    id: string;
    phone: string;
    password: string;
    role_name: string;
    fullname: string;
    email: string;
    status: string;
    deleted: string;
}

const Account: React.FC = () => {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [viewingAccount, setViewingAccount] = useState<Account | null>(null);
    const [processingAccountId, setProcessingAccountId] = useState<string | null>(null);

    const [getformData, setGetformData] = useState<GetFormData>({
        id: '',
        phone: '',
        password: '',
        role_name: '',
        fullname: '',
        email: '',
        status: '',
        deleted: ''
    });

    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data: Account[] = await getAccountDetail();
                setAccounts(data);
                setGetformData({
                    id: '',
                    phone: '',
                    password: '',
                    role_name: '',
                    fullname: '',
                    email: '',
                    status: '',
                    deleted: ''
                });
            } catch (error) {
                console.error('Lỗi khi tải danh sách tài khoản:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAccount = async () => {
        const { fullname, email, phone } = formData;

        try {
            setIsActionLoading(true);
            await create_account(fullname, email, phone);
            const updatedAccounts: Account[] = await getAccountDetail();
            setAccounts(updatedAccounts);
            alert('Tạo tài khoản thành công!');
            setShowAddForm(false);
            setFormData({ fullname: '', email: '', phone: '' });
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
            toast.error('Đã xảy ra lỗi khi tạo tài khoản');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleResetPassword = async (accountId: string) => {
        const confirmed = window.confirm('Bạn có chắc reset mật khẩu của tài khoản này không?');
        if (!confirmed) return;

        try {
            setIsActionLoading(true);
            await reset_pass(accountId);
            toast.success("Đã reset mật khẩu thành '123456'");
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('Đã xảy ra lỗi khi reset mật khẩu');
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleToggleStatus = async (account: Account) => {
        if (!account?.id) {
            console.error('ID tài khoản không tồn tại!');
            return;
        }

        try {
            setProcessingAccountId(account.id);
            // Optimistically update the local state
            setAccounts((prevAccounts) =>
                prevAccounts.map((acc) =>
                    acc.id === account.id ? { ...acc, status: !acc.status } : acc
                )
            );
            await post_status(account.id);
            // Fetch the latest data to confirm the update
            const updatedAccounts = await getAccountDetail();
            setAccounts(updatedAccounts);
            toast.success('Đổi trạng thái thành công!');
        } catch (error) {
            console.error('Lỗi khi đổi trạng thái:', error);
            toast.error('Đổi trạng thái thất bại!');
            // Revert the optimistic update on error
            setAccounts((prevAccounts) =>
                prevAccounts.map((acc) =>
                    acc.id === account.id ? { ...acc, status: !acc.status } : acc
                )
            );
        } finally {
            setProcessingAccountId(null);
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
                                e.preventDefault();
                                handleAddAccount();
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
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <button
                                    onClick={() => setViewingAccount(account)}
                                    style={{ ...iconButtonStyle, backgroundColor: 'transparent' }}
                                >
                                    <MdVisibility title="Xem" size={20} />
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(account)}
                                    disabled={processingAccountId === account.id}
                                    style={iconButtonStyle}
                                >
                                    {processingAccountId === account.id ? (
                                        '...'
                                    ) : account.status ? (
                                        <MdLockOpen title="Mở khóa tài khoản" size={20} color="green" />
                                    ) : (
                                        <MdLock title="Khóa tài khoản" size={20} color="red" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleResetPassword(account.id)}
                                    disabled={isActionLoading}
                                    style={iconButtonStyle}
                                >
                                    {isActionLoading ? '...' : <MdRefresh title="Reset mật khẩu" size={20} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    {deletingAccount && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '30px',
                                    borderRadius: '8px',
                                    width: '400px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    textAlign: 'center',
                                }}
                            >
                                <h3 style={{ margin: 0 }}>Xác nhận xóa</h3>
                                <p style={{ margin: '20px 0' }}>
                                    Bạn có chắc muốn xóa tài khoản của "{deletingAccount.fullname}" không?
                                </p>
                                <div style={modalActionsStyle}>
                                    <button onClick={() => setDeletingAccount(null)} style={cancelButtonStyle}>
                                        Không
                                    </button>
                                    <button
                                        onClick={() => setDeletingAccount(null)}
                                        style={{ ...saveButtonStyle, backgroundColor: '#f44336' }}
                                    >
                                        Có, Xóa!
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {viewingAccount && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                            }}
                        >
                            <div
                                style={{
                                    background: 'linear-gradient(to bottom right, #fdfdfd, #f0f8ff)',
                                    padding: '30px 25px',
                                    borderRadius: '16px',
                                    width: '420px',
                                    boxShadow: '0 12px 25px rgba(0,0,0,0.2)',
                                    fontFamily: 'Arial, sans-serif',
                                    position: 'relative',
                                    animation: 'fadeIn 0.3s ease-in-out',
                                }}
                            >
                                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
                                    👤 Thông Tin Tài Khoản
                                </h2>

                                <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#444' }}>
                                    <p>
                                        <strong>📛 Họ và tên:</strong> {viewingAccount.fullname}
                                    </p>
                                    <p>
                                        <strong>📧 Email:</strong> {viewingAccount.email}
                                    </p>
                                    <p>
                                        <strong>📞 Số điện thoại:</strong> {viewingAccount.phone}
                                    </p>
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
                                            transition: 'background-color 0.2s ease',
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
};

const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};
const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
};
const addButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};
const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '98%',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const tableHeaderStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr 2fr',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    fontWeight: 'bold',
};

const tableRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr 2fr',
    padding: '10px',
    alignItems: 'center',
};

const iconButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
    padding: '5px',
};

const modalActionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
};
const cancelButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#cecece',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};
const saveButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#388E3C',
};

export default Account;