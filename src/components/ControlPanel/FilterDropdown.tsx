import { useDispatch, useSelector } from 'react-redux';
import { MapFilters, setFilters } from '../../features/mapFilters/mapFiltersSlice';
import { MapStore } from '../../store/store';
import React, { useMemo, useState } from 'react';
import { FilterType } from './Filter';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';

export type Props = {
  filter: FilterType;
  filterParentKey: string;
};

export const FilterDropdown = ({ filter, filterParentKey }: Props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

  const { field, label, options } = filter;

  const filterValue = mapFilters[filterParentKey][field];

  const handleOptionChange = (selection: string) => {
    dispatch(setFilters({ [filterParentKey]: { [field]: selection } }));
  };

  const filteredOptions = useMemo(() => {
    const formatForSort = (val: string) => {
      if (isNaN(parseFloat(val))) {
        return val.toLowerCase();
      }

      return +val;
    };

    return options
      ?.filter((f) => f)
      .sort((a: string, b: string) => (formatForSort(a) > formatForSort(b) ? 1 : -1));
  }, [options]);

  const searchDropdown = (option: string) => !searchTerm || option.includes(searchTerm);

  const dropdownTitle = filterValue ? filterValue : `Select ${label}`;
  return (
    <DropdownButton
      id={`filter-dropdown-${field}`}
      key={`filter-dropdown-${field}`}
      size='sm'
      title={dropdownTitle}
      onSelect={handleOptionChange}
      variant='outline-secondary'
    >
      <Form.Control
        id={`filter-dropdown-search-${field}`}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search...'
      />
      {!searchTerm ? (
        <Dropdown.Item active={filterValue === ''} eventKey=''>
          All
        </Dropdown.Item>
      ) : null}
      {filteredOptions.filter(searchDropdown).map((option) => (
        <Dropdown.Item key={option} eventKey={option} active={filterValue === option}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
