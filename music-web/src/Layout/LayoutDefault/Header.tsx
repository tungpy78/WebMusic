import Search from "antd/es/transfer/search";
import Logo from "../../Components/Images/logo.png"
import { Button } from "antd";
import { Link } from "react-router-dom";
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
                <Link to="/login" ><Button type="primary" className="layoutdefault__header--account--btn">Đăng nhập</Button></Link>
                <Link to="/register"><Button type="primary" style={{margin: "0 10px"}} className="layoutdefault__header--account--btn">Đăng ký</Button></Link>
            </div>
        </>
    )
}
export default HeaderLayout;