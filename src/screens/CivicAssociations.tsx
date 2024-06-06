import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
// import Association from 'esri/rest/networks/support/Association';

function CivicAssociations() {
    const [association, setAssociation] = useState("");

    useEffect(() => {
        const latitude = sessionStorage.getItem('latitude');
        const longitude = sessionStorage.getItem('longitude');
        console.log(latitude)

        if (!latitude || !longitude) {
            console.error("Latitude or longitude not found in sessionStorage.");
            return;
        }

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

            const view = new MapView({
                container: "viewMap",
                map: map,
                center: [longitude, latitude],
                zoom: 13
            });

            const civicAssociationsLayer = new FeatureLayer({
                url: "https://services.arcgis.com/Vf3WolhywM9gLSJx/arcgis/rest/services/civic_associations_shp/FeatureServer/0"
            });

            map.add(civicAssociationsLayer);

            const userLocation = new Point({
                longitude: longitude,
                latitude: latitude
            });

            const markerSymbol = {
                type: "simple-marker",
                color: "orange", // You can customize the color and size of the marker
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

            // civicAssociationsLayer.queryFeatures(query).then((result: __esri.FeatureSet) => {
            //     if (result.features.length > 0) {
            //         const associationName = result.features[0].attributes["Name"];
            //         setAssociation(associationName);
            //     } else {
            //     }
            // }).catch((error: Error) => {
            //     console.error("Error querying features:", error);
            // });
        }).catch(error => {
            console.error("Error loading modules:", error);
        });
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    return (<div>
        <div id="viewMap" style={{ height: 400, width: "100%" }}>
        </div>
        <div>
            {association}
        </div>
    </div>);
}

export default CivicAssociations;

