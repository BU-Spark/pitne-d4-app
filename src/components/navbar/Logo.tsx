import React from "react";
import { useNavigate } from "react-router-dom";

function LogoBar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div onClick={handleClick} style={{
            cursor: "pointer"
        }}>
            <div className="logo">
                DISTRICT 4
            </div>
        </div>
    );
}

export default LogoBar;
