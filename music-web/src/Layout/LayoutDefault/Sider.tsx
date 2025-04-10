import { FireOutlined, FundOutlined, ProductOutlined, StarOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
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
                label: 'Thư viện',
                },
                {
                key: '2',
                icon: <FundOutlined />,
                label: <Link to={"/"}>Khám phá</Link>,
                },
                {
                key: '3',
                icon: <StarOutlined />,
                label: 'BXH Nhạc mới',
                },
                {
                key: '4',
                icon: <ProductOutlined />,
                label: 'Chủ đề thể loại',
                },
                {
                key: '5',
                icon: <FireOutlined />,
                label: 'Top 100',
                },
            ]}
        />
    </>
    )
}
export default SiderLayout