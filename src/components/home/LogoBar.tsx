import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from './LoginButton';
import Logo from './Logo';
import HamburgerMenu from "./Hamburger";
import LogOut from '../../screens/LogOut';

function LogoBar() {
    const navigate = useNavigate();

    return (
        <header className="logo-bar">
            <div className="logo-bar-left">
                <Logo />
            </div>
            <div className="logo-bar-right">
                <HamburgerMenu />
            </div>
        </header>
    );
}

export default LogoBar;
