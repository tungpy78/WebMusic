import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import "../../assets/scss/Page404.scss";

function Page404() {
  const user = localStorage.getItem("user");
  console.log(user);
  return (
    <div className="page404">
      <div className="page404__content">
        <FaMusic className="music-icon" />
        <h1>404</h1>
        <h2>Oops! Không tìm thấy trang</h2>
        <p>Có vẻ như bản nhạc bạn đang tìm đã... biến mất vào không gian 😢</p>
        <Link to="/" className="page404__btn">
          🎵 Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default Page404;
