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

//import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

//import { NumericLiteral } from "typescript";
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

  type Point = {
    lat: number;
    lng: number;
  };

  const polygon = new Polygon({
    rings: [
      [
        [-71.090879, 42.285624],
        [-71.091372, 42.284251],
        [-71.089634, 42.283894],
        [-71.088776, 42.286124],
        [-71.090879, 42.285624]
      ]
    ],
    spatialReference: { wkid: 4326 }
  });
  

  const isPointInPolygon = (coords: Point) => {
    let point = new Point({
      longitude: coords.lng,
      latitude: coords.lat,
      spatialReference: { wkid: 4326 }
    });

    return geometryEngine.contains(polygon, point);
  };



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
            console.log("Its working")
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
          console.log(coords)
          if (!coords) {
            setShowLoading(false);
            setShowInvalid(true);
            return;
          }
          if (isPointInPolygon(coords)) {
            console.log("True");
            setShowLoading(false);
            setShowSuccess(true);
            navigateToNext();
          } else {
            console.log("False");
            setShowLoading(false);
            setShowError(true);
          }
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

export default CivicAssociations;
