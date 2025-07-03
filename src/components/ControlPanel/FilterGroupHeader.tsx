import React from 'react';
import { splitCamelCaseAndCapitalize } from '../../common/utils';
import { MapFilters, setFilters } from '../../features/mapFilters/mapFiltersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MapStore } from '../../store/store';
import { Form } from 'react-bootstrap';

type Props = {
  filterParentKey: string;
};

export const FilterGroupHeader = ({ filterParentKey }: Props) => {
  const dispatch = useDispatch();

  const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

  const showGroup = mapFilters[filterParentKey].showGroup;

  const handleCheck = () => {
    dispatch(setFilters({ [filterParentKey]: { showGroup: !showGroup } }));
  };

  return (
    <Form.Check
      checked={showGroup}
      className='filter-group-header'
      id={filterParentKey}
      label={splitCamelCaseAndCapitalize(filterParentKey)}
      onChange={handleCheck}
    />
  );
};
