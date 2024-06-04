import * as React from "react";
import AddressCheckBox from "../components/address/AddressCheckBox";
import AddressCheckBoxLoading from "../components/address/AddressCheckBoxLoading";
import AddressErrorBox from "../components/address/AddressErrorBox";
import AddressInvalidBox from "../components/address/AddressInvalidBox";
import AddressAPIErrorBox from "../components/address/AddressAPIErrorBox";
import StateSelection from "../components/address/StateSelection";
import { TextInput, Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import { ProgressStepperCompact1 } from "../components/home/Progressbar";
import { loadModules } from "esri-loader";

function CivicAssociations() {
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const [showInvalid, setShowInvalid] = React.useState(false);
    const [showAPIError, setShowAPIError] = React.useState(false);

    // Store the address, city, state, and zip in state
    const [address, setAddress] = React.useState("");
    // const [address2, setAddress2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("")

    const navigateToNext = () => {
        setShowLoading(true);
        setTimeout(() => {
            setShowLoading(false);
            setShowSuccess(true);
            // navigate("/signup");
        }, 1000);
    };

    const submit = () => {
        setShowError(false);
        setShowInvalid(false);
        setShowAPIError(false);
        setShowLoading(true);

        setShowLoading(false);
        setShowSuccess(true);
        navigateToNext();
        const a = {
            address,
            city,
            state,
            zip
        };

        if (a.address === "" || a.city === "" || a.state === "" || a.zip === "") {
            setShowLoading(false);
            setShowInvalid(true);
        } else if (a.state === "Other") {
            setShowLoading(false);
            setShowError(true);
        }
        /***Can also implement some sort of address validity checking here before going into the main ArcGIS query check*/
        else {
            // Get coordinates from address using openstreetmap API
            const url = "https://nominatim.openstreetmap.org/search?"
                + "street=" + a.address + "&city=" + a.city + "&state=" + a.state + "&postalcode=" + a.zip + "&format=json";
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        setShowLoading(false);
                        setShowAPIError(true);
                        return;
                    } else {
                        // Store the coordinates in state
                        if (data.length === 0) {
                            setShowLoading(false)
                            setShowInvalid(true);
                            return;
                        }
                        const coords = { lat: data[0].lat, lng: data[0].lon };
                        // Perform ArcGIS spatial query to determine civic association
                        loadModules([
                            "esri/Map",
                            "esri/views/MapView",
                            "esri/layers/FeatureLayer",
                            "esri/tasks/QueryTask",
                            "esri/tasks/support/Query",
                            "esri/geometry/Point",
                            "esri/Graphic",
                            "esri/GraphicLayer"
                        ]).then(([Map, MapView, FeatureLayer, QueryTask, Query, Point, Graphic, GraphicLayer]) => {
                            const map = new Map({
                                basemap: "streets-navigation-vector"
                            });

                            const view = new MapView({
                                container: "viewDiv",
                                map: map,
                                center: [coords.lng, coords.lat],
                                zoom: 13
                            });

                            const civicAssociationsLayer = new FeatureLayer({
                                url: "https://services.arcgis.com/Vf3WolhywM9gLSJx/arcgis/rest/services/civic_associations_shp/FeatureServer/0"
                            });

                            map.add(civicAssociationsLayer);

                            const userLocation = new Point({
                                longitude: coords.lng,
                                latitude: coords.lat
                            });

                            const markerSymbol = {
                                type: "simple-marker",
                                color: "blue", // You can customize the color and size of the marker
                                size: 10
                            };

                            const userLocationGraphic = new Graphic({
                                geometry: userLocation,
                                symbol: markerSymbol
                            });

                            // Create a graphics layer and add the user location graphic to it
                            const userLocationGraphicsLayer = new GraphicLayer();
                            userLocationGraphicsLayer.add(userLocationGraphic);

                            // Add the graphics layer to the map
                            map.add(userLocationGraphicsLayer);

                            const query = new Query();
                            query.geometry = userLocation;
                            query.spatialRelationship = "intersects";
                            query.returnGeometry = false;
                            query.outFields = ["*"];

                            civicAssociationsLayer.queryFeatures(query).then((result: __esri.FeatureSet) => {
                                setShowLoading(false);
                                if (result.features.length > 0) {
                                    const association = result.features[0].attributes["Name"];
                                    alert("You are in the " + association + " civic association.");
                                    setShowSuccess(true);
                                    navigateToNext();
                                } else {
                                    alert("No civic association found for your location.");
                                    setShowInvalid(true);
                                }
                            }).catch(() => {
                                setShowLoading(false);
                                setShowAPIError(true);
                            });
                        }).catch(() => {
                            setShowLoading(false);
                            setShowAPIError(true);
                        });
                    }
                }).catch(() => {
                    setShowLoading(false);
                    setShowAPIError(true);
                });
        }
    };

    return (
        <div className="container-padded">
            <ProgressStepperCompact1 />
            <div className="text-start mt-5">Address</div>
            <TextInput
                className="px-2"
                id="textInput-basic-1"
                type="text"
                placeholder="Street Address"
                onChange={(e) => {
                    setAddress(e.split(" ").join("+"));
                }}
            />
            <TextInput
                className="mb-2 px-2"
                id="textInput-basic-1"
                type="text"
                placeholder="Apt, suite, unit, building, etc."
            // onChange={(e) => { // We don't actually need this field, its just for appearances lol
            //   setAddress2(e);
            // }}
            />

            <div className="mt-3 text-start">City</div>
            <TextInput
                className="mb-2"
                id="textInput-basic-1"
                type="text"
                placeholder="City"
                onChange={(e) => {
                    setCity(e.split(" ").join("+"));
                }}
            />

            <div className="text-start mt-3">State</div>
            <StateSelection
                state={state}
                setState={setState}
            />

            <div className="text-start mt-3">Zipcode</div>
            <TextInput
                className="mb-5 px-2"
                id="textInput-basic-1"
                type="text"
                placeholder="Zipcode"
                onChange={(e) => {
                    setZip(e.split(" ").join("+"));
                }}
            />

            {showSuccess && <AddressCheckBox></AddressCheckBox>}
            {showLoading && <AddressCheckBoxLoading></AddressCheckBoxLoading>}
            {showError && <AddressErrorBox></AddressErrorBox>}
            {showInvalid && <AddressInvalidBox></AddressInvalidBox>}
            {showAPIError && <AddressAPIErrorBox></AddressAPIErrorBox>}

            <div id="viewDiv" style={{ height: 400, width: "100%" }}></div>

            <div className="text-end mt-5 pt-5">
                <Button
                    onClick={submit}
                    className="px-3 py-1"
                    variant="primary"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default CivicAssociations;
