import React, { useEffect, useState } from 'react';

import tiedHouseJson from '../../data/tiedHouses.json';
import chicagoSculptureExhibitJson from '../../data/chicagoSculptureExhibit.json';
import muralsJson from '../../data/murals.json';
import neighborhoodJson from '../../data/neighborhoods.json';
import landmarkJson from '../../data/landmarks.json';

import { Point, PointOfInterest } from '../../models/MapMarkers';
import { useSelector } from 'react-redux';
import { MapStore } from '../../store/store';
import { MapFilters } from '../../features/mapFilters/mapFiltersSlice';
import { CustomAdvancedMarker } from './CustomAdvancedMarker';
import { getMapPointsFromJsonData, getMapPolygonsFromJsonData } from '../../common/utils';

export const PointsOfInterest = () => {
  const [pointOfInterests, setPointOfInterests] = useState<PointOfInterest[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<string>('');

  const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

  useEffect(() => {
    const displayedPOIs = [];
    displayedPOIs.push(
      getMapPointsFromJsonData(tiedHouseJson, mapFilters.tiedHouses, 'tiedHouses')
    );
    displayedPOIs.push(
      getMapPointsFromJsonData(
        chicagoSculptureExhibitJson,
        mapFilters.chicagoSculptureExhibit,
        'chicagoSculptureExhibit'
      )
    );
    displayedPOIs.push(getMapPointsFromJsonData(muralsJson, mapFilters.murals, 'murals'));
    displayedPOIs.push(
      getMapPolygonsFromJsonData(neighborhoodJson, mapFilters.neighborhoods, 'neighborhoods')
    );
    displayedPOIs.push(getMapPolygonsFromJsonData(landmarkJson, mapFilters.landmarks, 'landmarks'));
    setPointOfInterests(displayedPOIs);
  }, [mapFilters]);

  return (
    <React.Fragment>
      {pointOfInterests.map((poi: PointOfInterest) => (
        <React.Fragment>
          {poi.points.map((point: Point, index) => {
            return (
              <CustomAdvancedMarker
                pointIndex={index}
                point={point}
                pointStyles={poi.styles}
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
                type={poi.type}
              />
            );
          })}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
