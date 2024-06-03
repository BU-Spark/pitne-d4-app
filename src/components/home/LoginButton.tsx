import React from "react";
import { useNavigate } from "react-router-dom";
import LogOut from '../../screens/LogOut';

function LoginButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("hi");
        navigate("/login");
    };

    return (
        <div className="logout-button-div">
            <button onClick={handleClick} className="logout-button">Log In</button>
        </div>
    );
}

export default LoginButton;
