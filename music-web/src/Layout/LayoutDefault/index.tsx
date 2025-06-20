import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import SiderLayout from "./Sider";
import './layoutdefault.scss';
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";


function LayoutDefault() {
  const [showSider, setShowSider] = useState(true);
  return (
    <>
    <Layout className="layoutdefault">
      <Header className="layoutdefault__header">
        <HeaderLayout setShowSider={setShowSider} showSider={showSider} />
      </Header>
      <Layout className="layoutdefault__main">
        <div className={`layoutdefault__sider ${showSider ? "" : "hidden"}`}>
          <SiderLayout />
        </div>
        <Content className="layoutdefault__content">
          <Outlet />
        </Content>
      </Layout>
      <Layout>
        <Footer className="layoutdefault__footer" style={{padding:0}}>
          <FooterLayout />
        </Footer>
      </Layout>
    </Layout>
    </>
  );
}
export default LayoutDefault;