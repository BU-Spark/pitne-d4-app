import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from './LoginButton';
import HamburgerMenu from "./Hamburger";
import LogOut from '../../screens/LogOut';
import logo from './../../images/d4_logo.png'

function LogoBar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="logo-bar">
            <div className="logo-bar-left" onClick={handleLogoClick}>
                <img src={logo} alt="Home" style={{ width: '40px', height: '40px', cursor: "pointer" }} />
            </div>
            <div className="logo-bar-right">
                <HamburgerMenu />
            </div>
        </header>
    );
}

export default LogoBar;
