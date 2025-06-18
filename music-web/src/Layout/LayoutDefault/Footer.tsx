import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

function FooterLayout() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <h2 className="footer__logo">🎵 Music Web</h2>
        <ul className="footer__links">
          <li><a href="/about">Giới thiệu</a></li>
          <li><a href="/contact">Liên hệ</a></li>
          <li><a href="/terms">Điều khoản</a></li>
        </ul>
        <div className="footer__socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaSpotify /></a>
        </div>
      </div>
      <div className="footer__bottom">
        Copyright © 2025 Music Web. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterLayout;
