import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from './LoginButton.tsx';
import Logo from './Logo.tsx'

function LogoBar() {
    const navigate = useNavigate();

    return (
        // Incorporates the logo and login components to create a logo bar
        <div className="container-horizontal mb-4 mt-4" style={{ cursor: "pointer" }}>
        <Logo /> 
        <div style={{ marginLeft: "auto" }}>
            <LogIn /> 
        </div>
        </div>
    );
}

export default LogoBar;
