import Search from "antd/es/transfer/search";
import Logo from "../../Components/Images/logo.png"
import { Button } from "antd";
function HeaderLayout(){
    return(
        <>
            <div className="layoutdefault__header--logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="layoutdefault__header--search">
                <Search placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."/>
            </div>
            <div className="layoutdefault__header--account">
                <Button type="primary" className="layoutdefault__header--account--btn">Đăng nhập</Button>
                <Button type="primary" style={{marginLeft: "20px"}} className="layoutdefault__header--account--btn">Đăng ký</Button>
            </div>
        </>
    )
}
export default HeaderLayout;