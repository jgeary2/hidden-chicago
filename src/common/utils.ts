import { FilterType } from '../components/ControlPanel/Filter';
import { PointOfInterestType } from '../models/MapMarkers';
import { MapFilters } from '../features/mapFilters/mapFiltersSlice';

export const splitCamelCaseAndCapitalize = (val: string): string => {
  if (!val || val.trim().includes(' ')) {
    return '';
  }

  const result = val.trim().replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const capitalizeFirstLetters = (val: string): string => {
  if (!val) {
    return '';
  }

  const lower = val.toLowerCase();
  const words = lower.split(' ');

  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizedWords.join(' ');
};

export const applyMapFilters = (point: any, groupFilters: any) => {
  let isDataDisplayed = true;
  Object.keys(groupFilters).forEach((key) => {
    if (key === 'showGroup' && !groupFilters[key]) {
      isDataDisplayed = false;
    }

    // Only check filters that apply to the point and when point is not already hidden
    if (isDataDisplayed && point[key] !== undefined) {
      if (typeof groupFilters[key] === 'boolean') {
        if (groupFilters[key] && !point[key]) {
          isDataDisplayed = false;
        }
      } else {
        if (groupFilters[key] !== '' && groupFilters[key] !== point[key]) {
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

    let replaceValue = field ? field : '';

    try {
      new URL(replaceValue);
      replaceValue = `<a href="${replaceValue}" target="_blank">${replaceValue}</a>`;
    } catch (e) {}

    replacedString = replacedString.replace(token, replaceValue);
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
    styles,
    type: PointOfInterestType.MARKER
  };
};

export const getFilterDataFromJsonData = (data: any) => {
  const { filters, points } = data;

  const filtersFinal: FilterType[] = filters.map((filter: FilterType) => {
    const { field, type } = filter;
    let options: string[] | null = null;
    if (type !== 'boolean') {
      options = points.reduce((acc: string[], point: any) => {
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
