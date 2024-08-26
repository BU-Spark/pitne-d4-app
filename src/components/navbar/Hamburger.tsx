import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div className="hamburger-menu-container">
            <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#8801;
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className={`menu ${isOpen ? 'open' : ''}`}>
                    <Button onClick={() => handleNavigation("/")}>
                        Home
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/all-announcements")}>
                        Announcements
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/all-events")}>
                        Calendar
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/all-developments")}>
                        Developments
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/civic-associations-info")}>
                        Civic Associations
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/getresources")}>
                        Resources
                    </Button>
                    <hr />
                    <Button onClick={() => handleNavigation("/311Forms")}>
                        Report a Non-Emergency Issue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;
