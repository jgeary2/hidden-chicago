// Utils for processing

export const processMuralRegistry = () => {
    const data = require('../data/rawData/Mural Registry_20250619.json');
    console.log(data);

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
            media: properties.media,
        }
    });

    console.log(result);
}

export const processNeighborhoodData = () => {
    const data = require('../data/rawData/neighborhoods_data.json');

    const result = data.map((entry) => {
        const { the_geom, pri_neigh } = entry;
        const { coordinates } = the_geom;

        return {
            neighborhood: pri_neigh,
            coordinates: coordinates[0][0],
        }
    });

    console.log(result);
}

export const processLandmarksData = () => {
    const data = require('../data/rawData/landmarks_data.json');
    console.log(data);

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
            coordinates: coordinates[0][0],
        }
    });

    console.log(result);
}

export const processorFunctions = {
    processMuralRegistry: () => processMuralRegistry(),
    processNeighborhoodData: () => processNeighborhoodData(),
    processLandmarksData: () => processLandmarksData(),
}