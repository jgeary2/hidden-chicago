import {
  applyMapFilters,
  capitalizeFirstLetters,
  getPopupTextFromData,
  splitCamelCaseAndCapitalize
} from './utils';

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
      const point = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        booleanVal: true
      };

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
      const point = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        booleanVal: true
      };

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
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
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
      const point = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        booleanVal: true
      };

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
      const point = {
        title: 'Test Title',
        description: 'Test Description',
        link: 'http://test.com',
        other: 'Other thing'
      };

      const popupString = '{title}. <br/>{description} {link}';

      const result = getPopupTextFromData(point, popupString);

      expect(result).toEqual(
        'Test Title. <br/>Test Description <a href="http://test.com" target="_blank">http://test.com</a>'
      );
    });
  });
});
