import React, { useEffect, useRef, useState } from 'react';
import './LayoutAdmin.scss';
import './fontawesome';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faUsersCog,
    faHistory,
    faMusic,
    faTags,
    faUser,
    faCompactDisc,
    faChevronDown,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, Modal } from 'antd';
import {toast, ToastContainer} from 'react-toastify';
import {changePassword} from '../../Services/userService'

// Định nghĩa interface cho menu item
interface MenuItem {
    id: string;
    name: string;
    icon: any;
    path?: string;
    children?: { id: string; name: string; path: string }[];
}

// Định nghĩa interface cho user
interface User {
    userId: string;
    phone: string;
    role: string;
    fullname: string;
    email: string;
}

const LayoutAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [openRoleAccount, setOpenRoleAccount] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [form] = Form.useForm();
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState<boolean>(false);
    const user_current: User = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user_current?.role || 'Manager';

    useEffect(() => {
        const path = location.pathname;

        if (path === '/admin' || path === '/admin/') {
            setSelectedItem('dashboard');
            setOpenRoleAccount(false);
            navigate('/admin/dashboard', { replace: true });
            return;
        }

        if (path.startsWith('/admin/dashboard')) {
            setSelectedItem('dashboard');
            setOpenRoleAccount(false);
        } else if (path.startsWith('/admin/role')) {
            setSelectedItem('role');
            setOpenRoleAccount(true);
        } else if (path.startsWith('/admin/account')) {
            setSelectedItem('account');
            setOpenRoleAccount(true);
        } else if (path.startsWith('/admin/history')) {
            setSelectedItem('history-manager');
            setOpenRoleAccount(false);
        } else if (path.startsWith('/admin/song')) {
            setSelectedItem('song');
            setOpenRoleAccount(false);
        } else if (path.startsWith('/admin/topic')) {
            setSelectedItem('topic');
            setOpenRoleAccount(false);
        } else if (path.startsWith('/admin/artist')) {
            setSelectedItem('artist');
            setOpenRoleAccount(false);
        } else if (path.startsWith('/admin/album')) {
            setSelectedItem('album');
            setOpenRoleAccount(false);
        } else {
            setSelectedItem('');
            setOpenRoleAccount(false);
        }
    }, [location.pathname, navigate]);

    const menuItems: MenuItem[] = [
        { id: 'dashboard', name: 'Dashboard', icon: faTachometerAlt, path: '/admin/dashboard' },
        {
            id: 'role-account', name: 'Vai trò & Tài khoản', icon: faUsersCog,
            children: [
                { id: 'role', name: 'Vai trò', path: '/admin/role' },
                { id: 'account', name: 'Tài khoản', path: '/admin/account' },
            ],
        },
        { id: 'history-manager', name: 'Lịch sử hoạt động', icon: faHistory, path: '/admin/history' },
        { id: 'song', name: 'Bài hát', icon: faMusic, path: '/admin/song' },
        { id: 'topic', name: 'Thể loại', icon: faTags, path: '/admin/topic' },
        { id: 'artist', name: 'Nghệ sĩ', icon: faUser, path: '/admin/artist' },
        { id: 'album', name: 'Album', icon: faCompactDisc, path: '/admin/album' }
    ];

    const filteredMenuItems = userRole === 'Admin'
        ? menuItems
        : menuItems.filter(item => !['role-account', 'history-manager'].includes(item.id));

    const handleChildClick = (id: string) => {
        setSelectedItem(id);
    };

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/admin/profile");
    };

    const handlePassword = () => {
        setIsPasswordModalVisible(true); // Mở modal khi nhấn "Đổi mật khẩu"
    };

    const handlePasswordSubmit = async (values: { oldPassword: string; newPassword: string }) => {
        try {
            // Gọi API đổi mật khẩu
            const response = await changePassword(values.oldPassword, values.newPassword);
            console.log(response);
            // Hiển thị thông báo thành công
            toast.success(response.data.message || "Đổi mật khẩu thành công!");

            // Đóng modal và reset form
            setIsPasswordModalVisible(false);
            form.resetFields();
        } catch (error: any) {
            // Hiển thị thông báo lỗi
            console.error("Đổi mật khẩu thất bại:", error);
        }
    };

    const handlePasswordCancel = () => {
        setIsPasswordModalVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
        <ToastContainer/>
        <div className="admin-layout">
            <header className="admin-header">
                <div className="admin-header__logo">
                    <FontAwesomeIcon icon={['fab', 'drupal']} className="admin-header__www"/>
                    <div className="admin-header__title">ADMIN</div>
                    <FontAwesomeIcon
                        icon={['fas', isCollapsed ? 'toggle-off' : 'toggle-on']}
                        onClick={() => setIsCollapsed(prev => !prev)}
                        className="admin-header__toggle-icon"
                    />
                </div>

                <div className="admin-header__content">
                    <div className="admin-header__left">
                        <FontAwesomeIcon icon={['fas', 'magnifying-glass']} className="admin-header__btn-search"/>
                        <FontAwesomeIcon icon={['fas', 'expand']} className="admin-header__btn-expand"/>
                    </div>

                    <div className="admin-header__right">
                        <FontAwesomeIcon icon={['far', 'bell']} className="admin-header__bell"/>
                        <div
                            className="admin-header__person"
                            onClick={() => setShowDropdown(prev => !prev)}
                        >
                            <img src="/avatar_admin.png" alt="Avatar" className="admin-header__avatar"/>
                            <div className="admin-header__name">{user_current?.fullname || 'John Doe'}</div>
                            <FontAwesomeIcon icon={['fas', 'caret-down']} className="admin-header__caret"/>
                            {showDropdown && (
                                <div className="admin-header__dropdown" ref={dropdownRef}>
                                    <div className="admin-header__dropdown-item" onClick={handleProfile}>
                                        Hồ sơ
                                    </div>
                                    <div className="admin-header__dropdown-item" onClick={handlePassword}>
                                        Đổi mật khẩu
                                    </div>
                                    <div className="admin-header__dropdown-item" onClick={handleLogout}>
                                        Đăng xuất
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="admin-body">
                <ul className="admin-body__sidebar" data-collapsed={isCollapsed}>
                    <li className="sidebar__title">Navigation</li>

                    {filteredMenuItems.map(item => {
                        const isActive = selectedItem === item.id || (item.children && item.children.some(c => c.id === selectedItem));
                        const isRoleAccount = item.id === 'role-account';

                        return (
                            <React.Fragment key={item.id}>
                                <li
                                    className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''} ${isRoleAccount ? 'sidebar__item--parent' : ''}`}
                                    onClick={() => {
                                        if (isRoleAccount) {
                                            setOpenRoleAccount(prev => !prev);
                                            setSelectedItem('role-account');
                                        } else {
                                            setSelectedItem(item.id);
                                            setOpenRoleAccount(false);
                                            if (item.path) {
                                                navigate(item.path);
                                            }
                                        }
                                    }}
                                >
                                    {(isActive || (isRoleAccount && openRoleAccount)) && (
                                        <div className="sidebar__choose"></div>
                                    )}
                                    <FontAwesomeIcon icon={item.icon} className="sidebar__icon"/>
                                    <span className="sidebar__name">{item.name}</span>

                                    {item.children && (
                                        <FontAwesomeIcon
                                            icon={openRoleAccount ? faChevronDown : faChevronRight}
                                            className="sidebar__navigation"
                                        />
                                    )}
                                </li>

                                {isRoleAccount && openRoleAccount && item.children && (
                                    <ul className="sidebar__submenu">
                                        {item.children.map(child => {
                                            const isChildActive = selectedItem === child.id;
                                            return (
                                                <li
                                                    key={child.id}
                                                    className={`sidebar__submenu-item ${isChildActive ? 'sidebar__submenu-item--active' : ''}`}
                                                    onClick={() => {
                                                        handleChildClick(child.id);
                                                        navigate(child.path);
                                                    }}
                                                >
                                                    <div className="submenu__choose"></div>
                                                    <FontAwesomeIcon icon={faChevronRight}
                                                                     className="sidebar__submenu-icon"/>
                                                    <span>{child.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>

                <div className={`admin-body__outlet ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <Outlet/>
                </div>
            </div>

            {/* Modal đổi mật khẩu */}
            <Modal
                title="Đổi mật khẩu"
                visible={isPasswordModalVisible}
                onCancel={handlePasswordCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="FormChangePassword"
                    onFinish={handlePasswordSubmit}
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                    >
                        <Input.Password placeholder="Mật khẩu cũ" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                            { min: 6, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' }
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu mới" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        </>
    );
};

export default LayoutAdmin;