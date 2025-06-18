import { ClockCircleOutlined, CustomerServiceOutlined, FolderOutlined, FundOutlined, HeartOutlined, ProductOutlined, StarOutlined, UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { Link } from "react-router-dom"

function SiderLayout(){   
     
    return(
        <>
        <Menu
            theme="dark"
            mode="vertical"
            style={{backgroundColor: "#231B2E", marginTop: "30px"}}
            defaultSelectedKeys={['2']}
            items={[
                {
                key: '1',
                icon: <UserOutlined />, 
                label: <Link to={"/library"} >Thư viện</Link>
                },
                {
                key: '2',
                icon: <FundOutlined />,
                label: <Link to={"/"}>Khám phá</Link>,
                },
                {
                key: '3',
                icon: <StarOutlined />,
                label: <Link to="/ranks">Bảng xếp hạng</Link>,
                },
                {
                key: '4',
                icon: <ProductOutlined />,
                label: <Link to="/topics">Chủ đề thể loại</Link>
                },
                {
                key: '5',
                icon: <ClockCircleOutlined />,
                label: <Link to='/history'>Nghe gần đây</Link>,
                },
                {
                key: '6',
                icon: <HeartOutlined />,
                label: <Link to='/library'>Bài hát yêu thích</Link>,
                },
                 {
                key: '7',
                icon: <CustomerServiceOutlined />,
                label: <Link to='/library'>PlayList</Link>,
                },
                {
                key: '8',
                icon: <FolderOutlined />,
                label: <Link to='/Album'>Album</Link>,
                },

            ]}
        />
    </>
    )
}
export default SiderLayout