// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@patternfly/react-core";
// import { getAuth, signOut } from 'firebase/auth';

// const HamburgerMenu: React.FC = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleNavigation = (path: string) => {
//         navigate(path);
//         setIsOpen(false);
//     };

//     const handleSignOut = () => {
//         localStorage.removeItem('isManager');
//         const auth = getAuth();
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             console.log('Signed out successfully');
//             navigate('/login'); // Redirect to login page after sign out
//         }).catch((error) => {
//             // An error happened.
//             console.error('Sign out error', error);
//         });
//     };

//     return (
//         <div className="hamburger-menu-container">
//             <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
//                 &#8801;
//             </div>
//             <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
//                 <div className={`menu ${isOpen ? 'open' : ''}`}>
//                     <Button variant="link" onClick={() => handleNavigation("/")}>
//                         Home
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/all-announcements")}>
//                         Announcements
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/all-events")}>
//                         Calendar
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/all-developments")}>
//                         Developments
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/civic-associations-info")}>
//                         Civic Associations
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/getresources")}>
//                         Resources
//                     </Button>
//                     <Button variant="link" onClick={() => handleNavigation("/311Forms")}>
//                         Report a Non-Emergency Issue
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HamburgerMenu;
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
        setIsOpen(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem('isManager');
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('Signed out successfully');
            navigate('/login');
        }).catch((error) => {
            console.error('Sign out error', error);
        });
    };

    return (
        <div className="hamburger-menu-container">
            <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                &#8801;
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className={`menu ${isOpen ? 'open' : ''}`}>
                    <Button variant="link" onClick={() => handleNavigation("/")}>
                        Home
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/all-announcements")}>
                        Announcements
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/all-events")}>
                        Calendar
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/all-developments")}>
                        Developments
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/civic-associations-info")}>
                        Civic Associations
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/getresources")}>
                        Resources
                    </Button>
                    <Button variant="link" onClick={() => handleNavigation("/311Forms")}>
                        Report a Non-Emergency Issue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenu;
