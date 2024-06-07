import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import LogoBar from "../components/home/LogoBar";

function CivicAssociations() {
    const [association, setAssociation] = useState("");
    const [associationPart, setAssociationPart] = useState(false);
    const [addressEntered, setAddressEntered] = useState(false);

    const latitude = sessionStorage.getItem('latitude');
    const longitude = sessionStorage.getItem('longitude');

    useEffect(() => {
        if (latitude && longitude) {
            setAddressEntered(true);
        } else {
            setAddressEntered(false);
        }
    }, []);

    useEffect(() => {
        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/FeatureLayer",
            "esri/tasks/support/Query",
            "esri/geometry/Point",
            "esri/Graphic",
            "esri/layers/GraphicsLayer"
        ]).then(([Map, MapView, FeatureLayer, Query, Point, Graphic, GraphicsLayer]) => {
            const map = new Map({
                basemap: "streets-navigation-vector"
            });

            const civicAssociationsLayer = new FeatureLayer({
                url: "https://services.arcgis.com/Vf3WolhywM9gLSJx/ArcGIS/rest/services/civic_associations_shp/FeatureServer/0",
                renderer: {
                    type: "simple", // Use a simple renderer
                    symbol: {
                        type: "simple-fill", // Use a simple fill symbol for polygons
                        color: [255, 190, 128, 0.5], // Red color with 50% transparency
                        outline: {
                            width: 0.5, // Outline width in points
                            color: [0, 0, 0, 0.7] // Black color with 70% transparency for the outline
                        }
                    }
                },
                labelingInfo: [{ // Add labeling information
                    labelExpressionInfo: { expression: "$feature.name" }, // Replace "YourFieldNameHere" with the field name containing the names
                    symbol: {
                        type: "text", // Use a text symbol for labels
                        color: [0, 0, 0, 1], // Black color for the labels
                        font: {
                            size: 10, // Font size in points
                            family: "Arial", // Font family
                            weight: "bold" // Font weight
                        }
                    },
                }]
            });

            const view = new MapView({
                container: "viewMap",
                map: map,
                center: [longitude, latitude],
                zoom: 14
            });

            map.add(civicAssociationsLayer);

            if (addressEntered) {
                const userLocation = new Point({
                    longitude: longitude,
                    latitude: latitude
                });

                const markerSymbol = {
                    type: "simple-marker",
                    color: "blue", // You can customize the color and size of the marker
                    size: 7
                };

                const userLocationGraphic = new Graphic({
                    geometry: userLocation,
                    symbol: markerSymbol
                });

                const userLocationGraphicsLayer = new GraphicsLayer();
                userLocationGraphicsLayer.add(userLocationGraphic);
                map.add(userLocationGraphicsLayer);

                const query = new Query();
                query.geometry = userLocation;
                query.spatialRelationship = "intersects";
                query.returnGeometry = false;
                query.outFields = ["*"];
                civicAssociationsLayer.queryFeatures(query).then((result: __esri.FeatureSet) => {
                    if (result.features.length > 0) {
                        const associationName = result.features[0].attributes["Name"];
                        setAssociation(associationName);
                        setAssociationPart(true);
                    } else {
                        setAssociation("You are not a part of any association")
                        setAssociationPart(false);
                    }
                }).catch((error: Error) => {
                    console.error("Error querying features:", error);
                });
            }
        }).catch(error => {
            console.error("Error loading modules:", error);
        });
    }, [addressEntered]); // Empty dependency array ensures useEffect runs only once on component mount

    return (
        <div>
            <div className="mb-5">
                <LogoBar />
            </div>
            <div id="viewMap" style={{ height: 400, width: "100%", marginTop: '80px' }}>
            </div>
            {addressEntered &&
                <div>
                    {association}
                </div>
            }
        </div>);
}

export default CivicAssociations;

