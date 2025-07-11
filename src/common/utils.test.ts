import {
  applyMapFilters,
  capitalizeFirstLetters,
  getClearedFilters,
  getFilterDataFromJsonData,
  getMapPointsFromJsonData,
  getMapPolygonsFromJsonData,
  getPopupTextFromData,
  splitCamelCaseAndCapitalize
} from './utils';
import { PointOfInterestType } from '../models/MapMarkers';
import { MOCK_POINTS, MOCK_POLYGONS } from './mockData';

describe('utils.ts', () => {
  describe('splitCamelCaseAndCapitalize', () => {
    it('should return a camel case string split and capitalized', () => {
      expect(splitCamelCaseAndCapitalize(' thisIsACamelCaseTestString')).toBe(
        'This Is A Camel Case Test String'
      );
      expect(splitCamelCaseAndCapitalize(' handleSpace in TheString ')).toBe('');
      expect(splitCamelCaseAndCapitalize('oneword ')).toBe('Oneword');
      expect(splitCamelCaseAndCapitalize('')).toBe('');
      expect(splitCamelCaseAndCapitalize('    ')).toBe('');
      expect(splitCamelCaseAndCapitalize(undefined)).toBe('');
    });
  });

  describe('capitalizeFirstLetters', () => {
    it('should return the words in the string capitalized', () => {
      expect(capitalizeFirstLetters('this string should be capitalized')).toBe(
        'This String Should Be Capitalized'
      );
      expect(capitalizeFirstLetters('ALL CAPS')).toBe('All Caps');
      expect(capitalizeFirstLetters('otHer cApitaliZed letTers')).toBe('Other Capitalized Letters');
      expect(capitalizeFirstLetters('  ')).toBe('  ');
      expect(capitalizeFirstLetters('')).toBe('');
      expect(capitalizeFirstLetters(undefined)).toBe('');
    });
  });

  describe('applyMapFilters', () => {
    it('should return true when data item matches on all applied filters', () => {
      const point = MOCK_POINTS[0];

      const groupFilters = {
        showGroup: true,
        title: 'Test Title',
        description: 'Test Description',
        booleanVal: true,
        otherField: 'Some other filter val'
      };

      expect(applyMapFilters(point, groupFilters)).toBe(true);
    });

    it('should return false if an applied string filter does not match the data item', () => {
      const point = MOCK_POINTS[0];

      const groupFilters = {
        showGroup: true,
        title: 'Test Title',
        description: 'No Description',
        booleanVal: true,
        otherField: 'Some other filter val'
      };

      expect(applyMapFilters(point, groupFilters)).toBe(false);
    });

    it('should return false if an applied boolean filter applied that does not match item', () => {
      const point = {
        ...MOCK_POINTS[0],
        booleanVal: false
      };

      const groupFilters = {
        showGroup: true,
        title: 'Test Title',
        description: 'Test Description',
        booleanVal: true,
        otherField: 'Some other filter val'
      };

      expect(applyMapFilters(point, groupFilters)).toBe(false);
    });

    it('should return false when showGroup is false', () => {
      const point = MOCK_POINTS[0];

      const groupFilters = {
        showGroup: false,
        title: 'Test Title',
        description: 'Test Description',
        otherField: 'Some other filter val',
        booleanVal: true
      };

      expect(applyMapFilters(point, groupFilters)).toBe(false);
    });
  });

  describe('getPopupTextFromData', () => {
    it('should return formatted popup text', () => {
      const point = MOCK_POINTS[0];

      const popupString = '{title}. <br/>{description} {link}';

      const result = getPopupTextFromData(point, popupString);

      expect(result).toEqual(
        'Test Title. <br/>Test Description <a href="http://test.com" target="_blank">http://test.com</a>'
      );
    });
  });

  describe('getMapPolygonsFromJsonData', () => {
    it('should return map data for polygons', () => {
      const points = MOCK_POLYGONS;

      const popup = {
        header: '{title}',
        content: '{description}'
      };
      const styles = { fill: 'black' };

      const data = {
        points,
        popup,
        styles
      };

      const groupFilters = {
        showGroup: true,
        title: 'Test Title'
      };

      const groupName = 'testFilterGroup';

      const result = getMapPolygonsFromJsonData(data, groupFilters, groupName);

      expect(result.points).toStrictEqual([
        {
          key: 'testFilterGroup-0-12345',
          coordinates: points[0].coordinates,
          popup: {
            header: 'Test Title',
            content: 'Test Description'
          }
        }
      ]);

      expect(result.styles).toBe(styles);
      expect(result.type).toBe(PointOfInterestType.POLYGON);
    });
  });

  describe('getMapPointsFromJsonData', () => {
    it('should return map data for marker points', () => {
      const points = MOCK_POINTS;

      const popup = {
        header: '{title}',
        content: '{description}'
      };
      const styles = { fill: 'black' };

      const data = {
        points,
        popup,
        styles
      };

      const groupFilters = {
        showGroup: true,
        title: 'Test Title'
      };

      const groupName = 'testFilterGroup';

      const result = getMapPointsFromJsonData(data, groupFilters, groupName);

      expect(result.points).toStrictEqual([
        {
          key: 'testFilterGroup-0-12345-23456',
          location: {
            lat: 12345,
            lng: 23456
          },
          popup: {
            header: 'Test Title',
            content: 'Test Description'
          }
        }
      ]);

      expect(result.styles).toBe(styles);
      expect(result.type).toBe(PointOfInterestType.MARKER);
    });
  });

  describe('getFilterDataFromJsonData', () => {
    it('should return parsed filter json data', () => {
      const points = MOCK_POINTS;

      const filters = [
        {
          field: 'title',
          type: 'string'
        },
        {
          field: 'booleanVal',
          type: 'boolean'
        }
      ];

      const data = {
        filters,
        points
      };

      const result = getFilterDataFromJsonData(data);

      expect(result[0]).toStrictEqual({
        field: 'title',
        type: 'string',
        options: ['Test Title', 'Another Title']
      });

      expect(result[1]).toStrictEqual({
        field: 'booleanVal',
        type: 'boolean',
        options: null
      });
    });

    describe('getClearedFilters', () => {
      it('should return cleared map filters', () => {
        const mapFilters = {
          group1: {
            title: 'Title',
            showGroup: true,
            description: 'Test Title',
            otherBool: true
          },
          group2: {
            title: '',
            showGroup: false,
            subTitle: 'Subtitle',
            thirdBool: true
          }
        };

        // @ts-ignore
        const result: any = getClearedFilters(mapFilters);

        expect(result.group1).toStrictEqual({
          title: '',
          showGroup: false,
          description: '',
          otherBool: false
        });

        expect(result.group2).toStrictEqual({
          title: '',
          showGroup: false,
          subTitle: '',
          thirdBool: false
        });
      });
    });
  });
});
