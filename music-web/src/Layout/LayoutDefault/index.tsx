import React, { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import HeaderLayout from './Header';
import SiderLayout from './Sider';
import FooterLayout from './Footer';
import { Outlet } from 'react-router-dom';
import './layoutdefault.scss';

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function LayoutDefault() {
    // State để quản lý trạng thái đóng/mở của Sider, đặt ở component cha
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint(); // Hook để theo dõi kích thước màn hình

    // Tự động thu gọn Sider trên màn hình nhỏ (lg trở xuống) và mở ra trên màn hình lớn
    useEffect(() => {
        if (screens.lg === false) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [screens.lg]);

    return (
        <Layout className="layoutdefault">
            <Header className="layoutdefault__header">
                {/* HeaderLayout của bạn không cần thay đổi nhiều, chỉ cần bỏ nút toggle cũ */}
                <HeaderLayout />
            </Header>
            <Layout>
                {/* --- NÂNG CẤP SIDER --- */}
                <Sider 
                    className="layoutdefault__sider"
                    collapsible
                    trigger={null} // Ẩn trigger mặc định của antd
                    collapsed={collapsed}
                    width={190} // Chiều rộng khi mở
                    collapsedWidth={50} // Chiều rộng khi thu gọn
                    // Thêm breakpoint để Sider tự ẩn hoàn toàn trên màn hình điện thoại
                    breakpoint="md"
                    onBreakpoint={(broken) => {
                        setCollapsed(broken);
                    }}
                >
                    {/* Truyền state và hàm toggle xuống cho SiderLayout */}
                    <SiderLayout collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                </Sider>

                {/* --- NÂNG CẤP CONTENT --- */}
                {/* Antd Layout sẽ tự động điều chỉnh margin cho Content */}
                <Layout className="layoutdefault__main-wrapper">
                    <Content className="layoutdefault__content">
                        <Outlet />
                    </Content>
                    <Footer className="footer" style={{padding:0}}>
                        <FooterLayout />
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default LayoutDefault;

