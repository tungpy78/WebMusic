import Search from "antd/es/transfer/search";
import Logo from "../../Components/Images/logo.png"
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
function HeaderLayout(){
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        navigate("/login");
    }
    
    return(
        <>
            <div className="layoutdefault__header--logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="layoutdefault__header--search">
                <Search placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."/>
            </div>
            <div className="layoutdefault__header--account">
                {user ? (
                    <>
                     <Button type="primary" onClick={handleLogout}>Đăng xuất</Button>
                    </>
                ):(
                    <>
                        <Link to="/login"><Button type="primary">Đăng nhập</Button></Link>
                        <Link to="/register"><Button type="primary">Đăng ký</Button></Link>
                    </>
                )}
            </div>
        </>
    )
}
export default HeaderLayout;