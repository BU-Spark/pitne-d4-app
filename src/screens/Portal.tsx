import { Button } from "@patternfly/react-core";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoBar from "../components/home/LogoBar";

function Portal() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="container">
        <LogoBar />
            <div className="mt-4 ms-4 portal-nav">
                <div className = "grab-cursor">
                <AngleLeftIcon size="md" onClick={() => navigate(-1)}/>
                </div>
            </div>
            <div className="heading">
                {location.state.title}
            </div>

            <div className="container-padded">
                {location.state.links.map((link : {url: string, title:string}) => {
                    return (
                        <Button
                            className="px-3 py-2 mb-2 home-button"
                            variant="primary"
                            onClick={() => window.open(link.url, "_blank")}
                        >
                            {link.title}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
export default Portal;