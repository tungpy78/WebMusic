import React, { useState, useEffect } from 'react';
import {
    FundOutlined,
    StarOutlined,
    ProductOutlined,
    ClockCircleOutlined,
    HeartOutlined,
    CustomerServiceOutlined,
    FolderOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho một mục trong menu
type MenuItem = Required<MenuProps>['items'][number];

// --- TỔ CHỨC LẠI CÁC MỤC MENU ---
// Tách các mục thành nhóm logic: Khám phá và Thư viện cá nhân
const items: MenuItem[] = [
    { 
        key: 'discover', // Sẽ khớp với path '/'
        icon: <FundOutlined />, 
        label: <Link to={"/"}>Khám phá</Link> 
    },
    { 
        key: 'ranks', 
        icon: <StarOutlined />, 
        label: <Link to="/ranks">Bảng xếp hạng</Link> 
    },
    { 
        key: 'topics', 
        icon: <ProductOutlined />, 
        label: <Link to="/topics">Chủ đề & Thể loại</Link> 
    },
    // Tạo một đường kẻ ngang để phân chia
    {
        type: 'divider',
    },
    // Nhóm "Thư viện"
    {
        key: 'library',
        label: 'Thư viện',
        icon: <UserOutlined />,
        children: [
            { 
                key: 'history', 
                icon: <ClockCircleOutlined />, 
                label: <Link to='/history'>Nghe gần đây</Link> 
            },
            { 
                key: 'favorite', 
                icon: <HeartOutlined />, 
                label: <Link to='/favorite'>Bài hát yêu thích</Link> 
            },
            { 
                key: 'playlist', 
                icon: <CustomerServiceOutlined />, 
                label: <Link to='/playlist'>PlayList</Link> 
            },
            { 
                key: 'album', 
                icon: <FolderOutlined />, 
                label: <Link to='/album'>Album</Link> 
            },
        ],
    },
];

// Định nghĩa props cho component
interface SiderLayoutProps {
    collapsed: boolean;
    onToggle: () => void;
}


// Hàm để tìm key của menu chính xác từ đường dẫn URL
const getKeyFromPath = (path: string) => {
    if (path === '/') return 'discover';
    // Lấy phần đầu tiên của path, ví dụ /topics/123 -> topics
    return path.split('/')[1]; 
}

const SiderLayout: React.FC<SiderLayoutProps> = ({ collapsed, onToggle }) => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(getKeyFromPath(location.pathname));

    useEffect(() => {
        setSelectedKey(getKeyFromPath(location.pathname));
    }, [location.pathname]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: "#231B2E" }}>
            {/* Nút toggle giờ sẽ gọi hàm onToggle từ props */}
            <Button 
                type="text" 
                onClick={onToggle} 
                style={{ 
                    color: 'white', 
                    margin: '16px 16px 0', 
                    textAlign: collapsed ? 'center' : 'right',
                }}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            <Menu
                theme="dark"
                mode="inline"
                inlineCollapsed={collapsed} // Trạng thái thu gọn được truyền từ props
                style={{ backgroundColor: "#231B2E", borderRight: 0, flexGrow: 1 }}
                defaultOpenKeys={['library']}
                selectedKeys={[selectedKey]}
                items={items}
            />
        </div>
    );
};

export default SiderLayout;
