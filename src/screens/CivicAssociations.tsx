import React, { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import LogoBar from "../components/home/LogoBar";
import AssociationCard from '../components/civic_associations/associations_card';
import { Text, TextVariants, TextInput } from '@patternfly/react-core';
import axios from 'axios';
import { AssociationTable } from './../interfaces';
import Loader from 'components/home/Loader';
import { filter } from 'esri/core/promiseUtils';

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
                const token = 'b6fecebf4096e294e8ddf5e9a6b9e7afc45e5f08836164d6f46c7d17baf1d85507c44c6af62503f1bddbf945d2b91d89aca2193bfdce2ada72aa1caa30b267333661e98f946a9d1c434d277a80fc022974d1644ff80c966f75a2b5e5b38c44605bc8111a176476ab5c40af79b7201b44a2751a2d49a5362b06283ce25fe42cd1'; // Replace 'YOUR_API_TOKEN' with your actual API token
                const response = await axios.get('http://localhost:1337/api/civic-associations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAssociations(response.data.data);
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
            <div className="mb-5">
                <LogoBar />
            </div>
            <div id="viewMap" style={{ height: 400, width: "100%", marginTop: '80px' }}>
            </div>
            {addressEntered && associationPart &&
                <div>
                    <h1 className='mt-3'>
                        Your Association
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
                <h1 className='mt-3'>
                    All Associations

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
                            <AssociationCard
                                key={assoc.id}
                                association={assoc}
                            />
                        ))
                    )
                ) : (
                    associations.map(assoc => (
                        <AssociationCard
                            key={assoc.id}
                            association={assoc}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default CivicAssociations;

