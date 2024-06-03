import React from "react";
import { useNavigate } from "react-router-dom";
import LogOut from '../../screens/LogOut';

function LogoBar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="container-horizontal mb-4 mt-4" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="logo">
                D4
            </div>
            <div style={{ marginLeft: "auto" }}>
                <LogOut /> 
            </div>
        </div>
    );
}

export default LogoBar;
