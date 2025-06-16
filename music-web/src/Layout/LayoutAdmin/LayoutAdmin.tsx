import React, {useEffect, useRef, useState} from 'react';
import './LayoutAdmin.scss';
import './fontawesome';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
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

const LayoutAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState('');
    const [openRoleAccount, setOpenRoleAccount] = useState(false);
    // Khai báo biến state isCollapsed
    const [isCollapsed, setIsCollapsed] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = location.pathname;

        if (path === '/admin' || path === '/admin/') {
            // Khi vô /admin thì chuyển sang /admin/dashboard
            setSelectedItem('dashboard');
            setOpenRoleAccount(false);
            navigate('/admin/dashboard', { replace: true });
            return;
        }
        // Xác định selectedItem dựa trên path hiện tại
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
            // Nếu path không khớp, reset chọn mục nào đó hoặc để trống
            setSelectedItem('');
            setOpenRoleAccount(false);
        }
    }, [location.pathname, navigate]);

    const menuItems = [
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

    // Click vào thẻ con
    const handleChildClick = (id: string) => {
        setSelectedItem(id);
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleProfile = () => {
        navigate("/profile");
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
                            <div className="admin-header__name">John Doe</div>
                            <FontAwesomeIcon icon={['fas', 'caret-down']} className="admin-header__caret"/>
                            {showDropdown && (
                                <div className="admin-header__dropdown" ref={dropdownRef}>
                                    <div className="admin-header__dropdown-item" onClick={handleProfile}>
                                        Hồ sơ
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

                    {menuItems.map(item => {
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
        </div>
    );
};

export default LayoutAdmin;