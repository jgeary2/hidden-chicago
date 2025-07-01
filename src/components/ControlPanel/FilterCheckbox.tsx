import { useDispatch, useSelector } from 'react-redux';
import { MapFilters, setFilters } from '../../features/mapFilters/mapFiltersSlice';
import { MapStore } from '../../store/store';
import React from 'react';
import { FilterType } from './Filter';
import { Form } from 'react-bootstrap';

export type Props = {
  filter: FilterType;
  filterParentKey: string;
};

export const FilterCheckbox = ({ filter, filterParentKey }: Props) => {
  const dispatch = useDispatch();
  const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

  const { field, label } = filter;

  const filterValue = mapFilters[filterParentKey][field];

  const handleCheck = () => {
    dispatch(setFilters({ [filterParentKey]: { [field]: !filterValue } }));
  };

  return (
    <Form.Check
      id={`filter-checkbox-${field}`}
      label={label}
      onChange={handleCheck}
      checked={filterValue}
    />
  );
};
