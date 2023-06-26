import "./header.css"
import Logo from './icons/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef} from "react";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem('name'));
  //로그인한 계정 이름 등록
  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  };

  return (
    <div className = "Header">
      <div>
        <Link to="/intro"><img className="logo-img" src={Logo} /></Link>
      </div>
      <div className="header-title">{userName}님 안녕하세요!</div>
      <div className="header-logout"><button className="logout-button" onClick={handleLogout}>로그아웃</button></div>
    </div>
  );
};

export default Header;
