import * as React from "react";
import AddressCheckBox from "../components/address/AddressCheckBox";
import AddressCheckBoxLoading from "../components/address/AddressCheckBoxLoading";
import AddressErrorBox from "../components/address/AddressErrorBox";
import AddressInvalidBox from "../components/address/AddressInvalidBox";
import AddressAPIErrorBox from "../components/address/AddressAPIErrorBox";
import { TextInput, Button } from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/Progressbar";
import { loadModules } from "esri-loader";
import NavBar from "../components/navbar/NavBar";

function AddressEntry() {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [showInvalid, setShowInvalid] = React.useState(false);
  const [showAPIError, setShowAPIError] = React.useState(false);

  // Store the address, city, state, and zip in state
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("")

  React.useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/user-addresses', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setCity(data.data[0].attributes.City);
          setState(data.data[0].attributes.State);
        }
      } catch (error) {
        console.error('Error fetching associations from Strapi:', error);
      }
    };
    fetchAddress();
  }, []);

  const navigateToNext = () => {
    setTimeout(() => {
      setShowLoading(false);
      setShowSuccess(true);
      navigate("/civic-associations");
    }, 1000);
  };

  const handleBack = () => {
    navigate("/address-info");
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

    if (a.address === "" || a.zip === "") {
      setShowLoading(false);
      setShowInvalid(true);
    }
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
            if (!coords) {
              setShowLoading(false);
              setShowInvalid(true);
              return;
            }

            loadModules([
              "esri/Map",
              "esri/layers/FeatureLayer",
              "esri/tasks/support/Query",
              "esri/geometry/Point"
            ]).then(([Map, FeatureLayer, Query, Point]) => {
              const map = new Map({
                basemap: "streets-navigation-vector"
              });

              const districtFourLayer = new FeatureLayer({
                url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/CityCouncilDistricts_2023_5_25/FeatureServer/0"
              })

              const userLocation = new Point({
                longitude: coords.lng,
                latitude: coords.lat
              })

              const query = new Query();
              query.geometry = userLocation;
              query.spatialRelationship = "intersects";
              query.returnGeometry = false;
              query.outFields = ["*"];

              districtFourLayer.queryFeatures(query).then((result: __esri.FeatureSet) => {
                setShowLoading(false);
                if (result.features.length > 0) {
                  const district = result.features[0].attributes["DISTRICT"];
                  if (district === 4) {
                    setShowSuccess(true);
                    sessionStorage.setItem("latitude", coords.lat);
                    sessionStorage.setItem("longitude", coords.lng);
                    navigateToNext()
                  } else {
                    setShowError(true)
                    return;
                  }
                }
              })
            })
          }
        }).catch(() => {
          setShowLoading(false);
          setShowAPIError(true);
          return;
        });
    }
  };

  return (

    <div className='p-4 m-3' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="mb-5">
        <NavBar />
      </div>
      <div>
        <h1 className='top-heading'>Address Entry</h1>
      </div>
      <div>
        <div className="text-start mt-5">Address</div>
        <TextInput
          className="mt-2 px-2"
          id="textInput-basic-1"
          type="text"
          placeholder="Street Address"
          onChange={(e) => {
            setAddress(e.split(" ").join("+"));
          }}
        />
        <div className="text-start mt-3">City</div>
        <TextInput
          className=""
          id="textInput-basic-1"
          type="text"
          placeholder="City"
          value={city}
          isReadOnly
        />

        <div className="text-start mt-3">State</div>
        <TextInput
          className=""
          id="textInput-basic-1"
          type="text"
          placeholder="State"
          value={state}
          isReadOnly
        />

        <div className="text-start mt-3">Zipcode</div>
        <TextInput
          className="mb-3 px-2"
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
      </div>

      <div>
        {/* Next Button */}
        <div className='p-2'>
          <Button
            onClick={submit}
            className="px-5 py-1 brand-blue"
            variant="primary"
          >
            Next
          </Button>
        </div>

        {/* Skip Button */}
        <div className='p-2'>
          <Button
            onClick={handleBack}
            className="px-5 py-1"
            variant="secondary"
          >
            Back
          </Button>
        </div>

      </div>
      {/* Progress Bar */}
      <div className='bottom-0 start-0 p-5' style={{ width: '100%' }}>
        <ProgressBar value={66} />
      </div>
    </div>
  );
}

export default AddressEntry;
