import {InfoWindow, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import React, {useEffect, useRef, useState} from "react";
import {Popup} from "../../models/MapMarkers";
import {PopupContent} from "./PopupContent";

type Props = {
    handleCloseClick: () => void;
    location: google.maps.LatLngLiteral
    marker: google.maps.marker.AdvancedMarkerElement;
    markerKey: string;
    popup: Popup;
}

export const CustomInfoWindow = ({
    handleCloseClick,
    location,
    marker,
    markerKey,
    popup,
}: Props) => {
    const map = useMap();
    const ref = useRef(null);
    const streetViewLibrary = useMapsLibrary('streetView');
    const [streetViewService, setStreetViewService] = useState(null);

    useEffect(() => {
        if (!streetViewLibrary || !map) {
            return;
        }
        console.log(ref.current);
        setStreetViewService(
            new streetViewLibrary.StreetViewPanorama(
                ref.current,
                {
                    position: location,
                    pov: {
                        heading: 34,
                        pitch: 10,
                    }
                }
            )
        );
    }, [streetViewLibrary, map, markerKey, location]);

    useEffect(() => {
        if (streetViewService) {
            map.setStreetView(streetViewService)
        }
    }, [streetViewService, map])

    return (
        <InfoWindow anchor={marker} onCloseClick={handleCloseClick}>
            <div style={{width: '500px', height: '300px'}}>
                <div className="street-view" id={`${markerKey}-street-view`} ref={ref}></div>
                <PopupContent popup={popup}/>
            </div>
        </InfoWindow>
    )
}