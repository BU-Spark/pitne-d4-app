import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core"; // Import your CSS file for styling

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false); // Close the menu after navigation
    };

    return (
        <div className="hamburger-menu-container">
            <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#8801; {/* This is the hamburger icon */}
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className={`menu ${isOpen ? 'open' : ''}`}>
                    <Button variant="link" onClick={() => handleNavigation("/all-announcements")}>
                        Announcements
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/all-events")}>
                        Calendar
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/resources")}>
                        Resources
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/all-posts")}>
                        News
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/login")}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;
