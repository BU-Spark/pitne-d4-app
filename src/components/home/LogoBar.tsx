import LogOut from '../../screens/LogOut'

function LogoBar() {
    return (
        <div className="container-horizontal mb-4 mt-4">
            <div className="logo">
                D7
            </div>
            <div style={{ marginLeft: "auto" }}>
            <LogOut /> 
            </div>
        </div>
    );
}
export default LogoBar;