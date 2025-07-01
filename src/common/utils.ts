import { FilterType } from '../components/ControlPanel/Filter';
import { PointOfInterestType } from '../models/MapMarkers';
import { MapFilters } from '../features/mapFilters/mapFiltersSlice';

export const getFormattedHeader = (val: string): string => {
  const result = val.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const applyMapFilters = (data: any, groupFilters: any) => {
  let isDataDisplayed = true;
  Object.keys(groupFilters).forEach((key) => {
    if (key === 'showGroup' && !groupFilters[key]) {
      isDataDisplayed = false;
    }

    // Only check filters that apply to the data and when data is not already hidden
    if (isDataDisplayed && data[key] !== undefined) {
      if (typeof groupFilters[key] === 'boolean') {
        if (groupFilters[key] && !data[key]) {
          isDataDisplayed = false;
        }
      } else {
        if (groupFilters[key] !== '' && groupFilters[key] !== data[key]) {
          isDataDisplayed = false;
        }
      }
    }
  });

  return isDataDisplayed;
};

export const getPopupTextFromData = (point: any, popupString: string) => {
  let replacedString = popupString;
  const regex = /\{(.*?)}/g;
  let match;
  while ((match = regex.exec(popupString)) !== null) {
    const token = match[0];
    const field = point[match[1]];
    replacedString = replacedString.replace(token, field);
  }

  return replacedString;
};

export const getMapPolygonsFromJsonData = (data: any, mapFilterGroup: any, groupName: string) => {
  const { points, popup, styles } = data;
  const mapPoints = points
    .filter((point: any) => applyMapFilters(point, mapFilterGroup))
    .map((point: any, index) => ({
      key: `${groupName}-${index}-${JSON.stringify(point.coordinates[0])}`,
      coordinates: point.coordinates,
      popup: {
        header: getPopupTextFromData(point, popup.header),
        content: getPopupTextFromData(point, popup.content)
      }
    }));

  return {
    points: mapPoints,
    styles,
    type: PointOfInterestType.POLYGON
  };
};

export const getMapPointsFromJsonData = (data: any, mapFilterGroup: any, groupName: string) => {
  const { points, popup, styles } = data;
  const mapPoints = points
    .filter((point: any) => point.latLng[0] && applyMapFilters(point, mapFilterGroup))
    .map((point: any, index) => ({
      key: `${groupName}-${index}-${point.latLng[0]}-${point.latLng[1]}`,
      location: {
        lat: point.latLng[0],
        lng: point.latLng[1]
      },
      popup: {
        header: getPopupTextFromData(point, popup.header),
        content: getPopupTextFromData(point, popup.content)
      }
    }));

  return {
    points: mapPoints,
    styles
  };
};
export const getFilterDataFromJsonData = (data: any) => {
  const filters = data.filters;

  const filtersFinal: FilterType[] = filters.map((filter: FilterType) => {
    const { field, type } = filter;
    let options: string[] | null = null;
    if (type !== 'boolean') {
      options = data.points.reduce((acc: string[], point: any) => {
        if (!acc.includes(point[field])) {
          acc.push(point[field]);
        }

        return acc;
      }, []);
    }

    return {
      ...filter,
      options
    };
  });

  return filtersFinal;
};

export const getClearedFilters = (mapFilters: MapFilters) => {
  const clearedFilters = {};
  Object.entries(mapFilters).forEach(([filterGroupKey, filterGroup]) => {
    const clearedFilter = {};
    Object.entries(filterGroup).forEach(([filterKey, filter]) => {
      clearedFilter[filterKey] = typeof filter === 'boolean' ? false : '';
    });

    clearedFilters[filterGroupKey] = clearedFilter;
  });

  return clearedFilters;
};
