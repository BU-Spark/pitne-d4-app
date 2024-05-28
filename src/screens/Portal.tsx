import { Button } from "@patternfly/react-core";
import { AngleLeftIcon } from "@patternfly/react-icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Portal() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div>
            <div className="mt-4 ms-4 portal-nav">
                <AngleLeftIcon size="md" onClick={() => navigate(-1)}/>
                {location.state.title}
            </div>
            <div className="container-padded">
                {location.state.links.map((link : {url: string, title:string}) => {
                    return (
                        <Button
                            className="px-3 py-2 mb-2 pinned"
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