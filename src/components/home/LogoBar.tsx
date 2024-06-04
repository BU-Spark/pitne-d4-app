import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from './LoginButton';
import Logo from './Logo'
import HamburgerMenu from "./Hamburger";

function LogoBar() {
    const navigate = useNavigate();

    return (
        // Incorporates the logo and login components to create a logo bar
        <div className="container-horizontal mb-4 mt-4" style={{ cursor: "pointer" }}>
        <Logo /> 
        {/* <div style={{ marginLeft: "auto" }}> */}
        <HamburgerMenu /> 
        {/* </div> */}
        </div>
    );
}

export default LogoBar;
