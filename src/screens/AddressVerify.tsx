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
function AddressVerify() {
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
      navigate("/signup");
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
    return;
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
    } else if (a.city !== "Boston") {
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
              setShowInvalid(true);
              return;
            }
            return { lat: data[0].lat, lng: data[0].lon };
          }
        }).then((coords) => {
          // Query ArcGIS Query API to return all layers that contain the point
          // https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::city-council-districts-effective-for-the-2023-municipal-election/about
          if (!coords) {
            setShowLoading(false);
            setShowInvalid(true);
            return;
          }
          const url = "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Docket%201275%20Committee%20Report/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
            + "&geometry=" + coords.lng + "%2C" + coords.lat + "&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects";
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (!data) {
                setShowLoading(false);
                setShowAPIError(true);
                return -1;
              } else {
                // Store the district in state
                return data.features[0].properties.DISTRICT
              }
            }).then((arcgisResponse) => {
              // Check if the address is in District 7
              if (arcgisResponse === -1) {
                setShowLoading(false);
                setShowAPIError(true);
              }
              else if (arcgisResponse === 7) {
                console.log('BRO');
                setShowLoading(false);
                setShowSuccess(true);
                navigateToNext();
              } else {
                setShowLoading(false);
                setShowError(true);
              }
            });
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

export default AddressVerify;
