import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import React from 'react';
import { Point, PointOfInterestType, PointStyles } from '../../models/MapMarkers';
import { CustomIcon } from './CustomIcon';
import { CustomPolygon } from './CustomPolygon';
import { PopupContent } from './PopupContent';
import { useDispatch } from 'react-redux';
import { setSelectionData } from '../../features/selectionData/selectionDataSlice';

type Props = {
  pointIndex: number;
  point: Point;
  pointStyles: PointStyles;
  selectedMarker: string;
  setSelectedMarker: (key: string) => void;
  type: PointOfInterestType;
};
export const CustomAdvancedMarker = ({
  pointIndex,
  point,
  pointStyles,
  selectedMarker,
  setSelectedMarker,
  type
}: Props) => {
  const dispatch = useDispatch();
  const [markerRef] = useAdvancedMarkerRef();

  const { coordinates, key, location, popup } = point;

  const handleOnClick = () => {
    setSelectedMarker(key);
    dispatch(
      setSelectionData({
        showDrawer: true,
        header: popup.header,
        content: popup.content,
        location
      })
    );
  };

  const handleOnPolygonClick = () => setSelectedMarker(key);

  const handleCloseClick = () => {
    setSelectedMarker('');
  };

  if (type === PointOfInterestType.POLYGON) {
    let latTotal = 0;
    let lngTotal = 0;
    const paths = coordinates.map((coords) => {
      latTotal += coords[1];
      lngTotal += coords[0];
      return {
        lat: coords[1],
        lng: coords[0]
      };
    });

    const windowPosition = {
      lat: latTotal / paths.length,
      lng: lngTotal / paths.length
    };
    return (
      <React.Fragment>
        <CustomPolygon
          onClick={handleOnPolygonClick}
          paths={paths}
          fillColor={pointStyles.fill[pointIndex % pointStyles.fill.length]}
        />

        {selectedMarker === key ? (
          <InfoWindow onCloseClick={handleCloseClick} position={windowPosition}>
            <PopupContent popup={popup} />
          </InfoWindow>
        ) : null}
      </React.Fragment>
    );
  }

  return (
    <AdvancedMarker clickable={true} onClick={handleOnClick} position={location} ref={markerRef}>
      <CustomIcon pointStyles={pointStyles} />
    </AdvancedMarker>
  );
};
