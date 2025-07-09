// Utils for processing raw data from assorted sources

import { capitalizeFirstLetters } from './utils';
import Papa from 'papaparse';

export const processMuralRegistry = () => {
  const data = require('../data/rawData/Mural Registry_20250619.json');

  const result = data.features.map((feature: any) => {
    const { properties } = feature;

    const parsedCoord1 = parseFloat(properties.latitude);
    const parsedCoord2 = parseFloat(properties.longitude);

    const latitude = parsedCoord1 > 0 ? parsedCoord1 : parsedCoord2;
    const longitude = parsedCoord1 > 0 ? parsedCoord2 : parsedCoord1;
    return {
      artist: properties.artist_credit,
      latLng: [latitude, longitude],
      location: properties.street_address,
      title: properties.artwork_title,
      yearInstalled: properties.year_installed,
      yearRestored: properties.year_restored,
      ward: properties.ward,
      media: properties.media
    };
  });

  console.log(result);
};

export const processNeighborhoodData = () => {
  const data = require('../data/rawData/neighborhoods_data.json');

  const result = data.map((entry) => {
    const { the_geom, pri_neigh } = entry;
    const { coordinates } = the_geom;

    return {
      neighborhood: pri_neigh,
      coordinates: coordinates[0][0]
    };
  });

  console.log(result);
};

export const processLandmarksData = () => {
  const data = require('../data/rawData/landmarks_data.json');

  const result = data.map((entry) => {
    const { the_geom, name, id, address, date_built, architect, landmark } = entry;
    const { coordinates } = the_geom;

    return {
      name,
      id,
      address,
      dateBuilt: date_built,
      architect,
      landmarkDate: landmark?.split('T')[0],
      landmarkYear: landmark?.split('-')[0],
      coordinates: coordinates[0][0]
    };
  });

  console.log(result);
};

export const processParksData = () => {
  const data = require('../data/rawData/parks_data.json');

  const result = data.map((entry) => {
    const { the_geom, label, park_no, location, ward, park_class } = entry;
    const { coordinates } = the_geom;

    const formattedWard = Math.trunc(ward);

    return {
      name: label,
      id: park_no,
      address: capitalizeFirstLetters(location),
      ward: formattedWard,
      parkType: capitalizeFirstLetters(park_class),
      coordinates: coordinates[0][0]
    };
  });

  console.log(result);
};

export const processDogParksData = () => {
  const data = require('../data/rawData/dog_parks_data.json');

  const result = data
    .filter((park: any) => park.location)
    .map((park: any) => {
      const { park_number, location, park_name, ward, park_class, street_address } = park;

      return {
        id: park_number,
        name: capitalizeFirstLetters(park_name),
        ward,
        type: capitalizeFirstLetters(park_class),
        location: capitalizeFirstLetters(street_address),
        latLng: [parseFloat(location.latitude), parseFloat(location.longitude)]
      };
    });

  console.log(result);
};

export const processHistoricalMarkerData = async () => {
  const response = await fetch('/HMdb-Entries-in-Chicago-20250707.csv');
  const readVal = await response.body.getReader().read();
  const decoder = new TextDecoder('utf-8');
  const csvString = decoder.decode(readVal.value!);
  const parsed = Papa.parse(csvString, {
    delimiter: ',',
    dynamicTyping: true,
    header: true,
    skipEmptyLines: true
  });

  const { data } = parsed;

  const result = data.map((marker: any) => {
    const {
      MarkerID,
      Title,
      Subtitle,
      "Add'l Subtitle": additional,
      'Latitude (minus=S)': latitude,
      'Longitude (minus=W)': longitude,
      'Street Address': address,
      'Year Erected': year,
      Location,
      Link,
      'Erected By': erectedBy
    } = marker;

    return {
      id: MarkerID,
      title: Title,
      subtitle: Subtitle,
      additionalSubtitle: additional,
      erectedBy,
      address: capitalizeFirstLetters(address),
      location: Location,
      year: year?.toString() || '',
      link: Link,
      latLng: [latitude, longitude]
    };
  });

  console.log(result);
};

export const processorFunctions = {
  processMuralRegistry: () => processMuralRegistry(),
  processNeighborhoodData: () => processNeighborhoodData(),
  processLandmarksData: () => processLandmarksData(),
  processParksData: () => processParksData(),
  processDogParksData: () => processDogParksData(),
  processHistoricalMarkerData: () => processHistoricalMarkerData()
};
