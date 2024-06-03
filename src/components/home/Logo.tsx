import React from "react";
import { useNavigate } from "react-router-dom";
import LogOut from '../../screens/LogOut';

function LogoBar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="logo">
                D4
            </div>
        </div>
    );
}

export default LogoBar;
