import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import LogoBar from "../components/home/LogoBar";
import AssociationCard from '../components/civic_associations/associations_card';


function CivicAssociations() {
    const [association, setAssociation] = useState("");
    const [associationPart, setAssociationPart] = useState(false);
    const [addressEntered, setAddressEntered] = useState(false);
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        if (sessionStorage.length > 0) {
            setLatitude(sessionStorage.getItem('latitude'));
            setLongitude(sessionStorage.getItem('longitude'));
            setZoom(14);
            setAddressEntered(true);

        } else {
            setLatitude("37.0902");
            setLongitude("-95.7129");
            setZoom(2);
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
                    type: "simple",
                    symbol: {
                        type: "simple-fill",
                        color: [255, 190, 128, 0.5],
                        outline: {
                            width: 0.5,
                            color: [0, 0, 0, 0.7]
                        }
                    }
                },
                labelingInfo: [{
                    labelExpressionInfo: { expression: "$feature.name" },
                    symbol: {
                        type: "text",
                        color: [0, 0, 0, 1],
                        font: {
                            size: 10,
                            family: "Arial",
                            weight: "bold"
                        }
                    },
                }]
            });

            const view = new MapView({
                container: "viewMap",
                map: map,
                center: [longitude, latitude],
                zoom: zoom
            });

            map.add(civicAssociationsLayer);

            if (addressEntered) {
                const userLocation = new Point({
                    longitude: longitude,
                    latitude: latitude
                });

                const markerSymbol = {
                    type: "simple-marker",
                    color: "blue",
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
    }, [latitude, longitude, addressEntered]);

    return (
        <div>
            <div className="mb-5">
                <LogoBar />
            </div>
            <div id="viewMap" style={{ height: 400, width: "100%", marginTop: '80px' }}>
            </div>
            {associationPart &&
                <div>
                    <h1 className='mt-3'>
                        Your Association
                    </h1>
                    <AssociationCard
                        association={association}
                    />
                    <h1 className='mt-3'>
                        All Associations
                    </h1>
                    <AssociationCard
                        association={association}
                    />

                </div>
            }
        </div>);
}

export default CivicAssociations;

