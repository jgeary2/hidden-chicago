import React, { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { getClearedFilters, getFilterDataFromJsonData } from '../../common/utils';
import { MapFilters, resetFilters, setFilters } from '../../features/mapFilters/mapFiltersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MapStore } from '../../store/store';
import { FilterGroupHeader } from './FilterGroupHeader';
import { Button } from 'react-bootstrap';

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const [controlPanelFilters, setControlPanelFilters] = useState<any[]>([]);
  const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

  const handleReset = () => {
    dispatch(resetFilters());
  };
  const handleClearAll = () => {
    const clearedFilters = getClearedFilters(mapFilters);

    dispatch(setFilters(clearedFilters));
  };

  useEffect(() => {
    const loadData = async () => {
      const dataFiltersPromise = Promise.all(
        Object.keys(mapFilters).map(async (filterKey) => ({
          [filterKey]: getFilterDataFromJsonData(await import(`../../data/${filterKey}.json`))
        }))
      );
      if (!active) {
        return;
      }

      dataFiltersPromise.then((dataFilters) => {
        setControlPanelFilters(dataFilters);
      });
    };

    let active = true;
    loadData();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid='control-panel' className='control-panel-container'>
      <h4>Map Controls</h4>
      <Button data-testid='button-reset' onClick={handleReset} variant='link'>
        Reset
      </Button>
      <Button data-testid='button-clear-all' onClick={handleClearAll} variant='link'>
        Clear all
      </Button>
      <hr />
      {controlPanelFilters.map((filterGroup, index) =>
        Object.keys(filterGroup).map((filterParentKey) => (
          <React.Fragment key={`filter-parent-${filterParentKey}`}>
            <FilterGroupHeader filterParentKey={filterParentKey} />
            {mapFilters[filterParentKey].showGroup
              ? filterGroup[filterParentKey].map((filter: any) => (
                  <Filter
                    key={`filter-${filterParentKey}-${filter.label}`}
                    filter={filter}
                    filterParentKey={filterParentKey}
                  />
                ))
              : null}
            {index < controlPanelFilters.length - 1 ? <hr className='horizontal-break' /> : null}
          </React.Fragment>
        ))
      )}
    </div>
  );
};
