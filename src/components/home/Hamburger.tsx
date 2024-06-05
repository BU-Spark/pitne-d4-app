import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@patternfly/react-core";
import { getAuth, signOut } from 'firebase/auth';

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

    const handleSignOut = () => {
        localStorage.removeItem('isManager');
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('Signed out successfully');
            navigate('/login'); // Redirect to login page after sign out
        }).catch((error) => {
            // An error happened.
            console.error('Sign out error', error);
        });
    };
    
    return (
        <div className="hamburger-menu-container">
            <div className="hamburger-icon" onClick={toggleMenu}>
            &#8801; {/* This is the hamburger icon */}
            </div>
            {isOpen && (
                <div className="menu">
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
                    <Button variant="link" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
