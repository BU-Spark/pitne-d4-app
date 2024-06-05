import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from './LoginButton.tsx';
import Logo from './Logo.tsx';
import HamburgerMenu from "./Hamburger.tsx";

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
