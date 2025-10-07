import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

function FooterLayout() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <h2 className="footer__logo">🎵 J97</h2>
        <ul className="footer__links">
          <li><a href="/">Giới thiệu</a></li>
          <li><a href="https://web.facebook.com/Tung2309">Liên hệ</a></li>
          <li><a href="/terms">Điều khoản</a></li>
        </ul>
        <div className="footer__socials">
          <a href="https://web.facebook.com/Tung2309"><FaFacebookF /></a>
          <a href=""><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaSpotify /></a>
        </div>
      </div>
      <div className="footer__bottom">
        Copyright © 2025 Music Web J97. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterLayout;
