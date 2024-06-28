import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import NavBar from "../components/navbar/NavBar";
import AssociationCard from '../components/civic_associations/AssociationCard';
import { Text, TextVariants, TextInput } from '@patternfly/react-core';
import { AssociationTable } from './../interfaces';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

function CivicAssociations() {
    const [associationPart, setAssociationPart] = useState(false);
    const [addressEntered, setAddressEntered] = useState(false);
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [zoom, setZoom] = useState(0);
    const [matchedAssociation, setMatchedAssociation] = useState<AssociationTable | undefined>(undefined);
    const [associations, setAssociations] = useState<AssociationTable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

        const fetchAssociations = async () => {
            try {
                const response = await fetch('https://pitne-d4-app-strapi-production.up.railway.app/api/civic-associations', {
                    method: 'GET',
                });
                if (response.ok) {
                    const data = await response.json();
                    setAssociations(data.data);
                }
            } catch (error) {
                console.error('Error fetching associations from Strapi:', error);
            }
        };
        fetchAssociations();
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
                        color: [133, 202, 227, 0.5],
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
                    color: "orange",
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
                        setMatchedAssociation(associations.find(assoc => assoc.attributes.Name === associationName))
                        setAssociationPart(true);
                    } else {
                        setAssociationPart(false);
                    }
                }).catch((error: Error) => {
                    console.error("Error querying features:", error);
                });
            }

        }).catch(error => {
            console.error("Error loading modules:", error);
        });

        setLoading(false);

    }, [latitude, longitude, addressEntered, associations]);

    if (loading) {
        return (
            <Loader />
        )
    }

    const filteredAssociations = associations.filter(
        assoc => assoc?.attributes.Name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div>
                <div className="mb-5">
                    <NavBar />
                </div>
                <div id="viewMap" style={{ height: 400, width: "100%" }}>
                </div>
                {addressEntered && associationPart &&
                    <div>
                        <h1 className='mt-3'>
                            <b>Your Association</b>
                        </h1>
                        <AssociationCard
                            key={matchedAssociation?.id}
                            association={matchedAssociation}
                        />
                        <hr />
                    </div>
                }

                {addressEntered && !associationPart &&
                    <div className='mt-3'>
                        <Text component={TextVariants.h1} style={{ fontWeight: 'bold' }}>
                            You are not a part of any association
                        </Text>
                        <hr />
                    </div>
                }
                <div>
                    <h1 className='top-heading'>
                        <b>All Associations</b>

                    </h1>
                    <div className='m-4'>
                        <TextInput
                            type="text"
                            value={searchTerm}
                            onChange={(value) => setSearchTerm(value)}
                            placeholder="Search associations..."
                            aria-label='Search for associations here'
                        />
                    </div>
                    {searchTerm ? (
                        filteredAssociations.length === 0 ? (
                            <p>No associations found.</p>
                        ) : (
                            filteredAssociations.map(assoc => (
                                <div style={{color: "#152d5c"}}>
                                <AssociationCard
                                    key={assoc.id}
                                    association={assoc}
                                />
                                </div>
                            ))
                        )
                    ) : (
                        associations.map(assoc => (
                            <div style={{color: "#152d5c"}}>
                            <AssociationCard
                                key={assoc.id}
                                association={assoc}
                            />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CivicAssociations;

