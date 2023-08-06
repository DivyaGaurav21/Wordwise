import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeoLocation'
import Button from './Button'

const Map = () => {

    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();

    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geoLocationPosition)
            setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer} >
            {!geoLocationPosition && (
                <Button type="position" onClick={getPosition} >
                    {isLoadingPosition ? "Loading.." : "Use Your Position"}
                </Button>
            )}
            <MapContainer
                // center={mapPosition}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {
                    cities.map((city) =>
                        <Marker position={[city.position.lat, city.position.lng]} key={city.id} >
                            <Popup>
                                {city.emoji} <br /> {city.cityName}
                            </Popup>
                        </Marker>
                    )
                }
                <DetectClick />
                <ChangeMapCenter position={mapPosition} />

            </MapContainer>
        </div>
    )
}

function ChangeMapCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map