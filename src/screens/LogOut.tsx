import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function LogOut() {
    const navigate = useNavigate();
    const auth = getAuth();

    const SignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logged out")
            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    return (
        <div className="logout-button-div">
            <button onClick={SignOut} className="logout-button">Sign Out</button>
        </div>
    )
}

export default LogOut