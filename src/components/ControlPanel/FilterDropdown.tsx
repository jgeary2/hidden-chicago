import {useDispatch, useSelector} from "react-redux";
import {MapFilters, setFilters} from "../../features/mapFilters/mapFiltersSlice";
import {MapStore} from "../../store/store";
import React, {useMemo} from "react";
import {FilterType} from "./Filter";
import {Dropdown, DropdownButton} from "react-bootstrap";

export type Props = {
    filter: FilterType;
    filterParentKey: string;
}

export const FilterDropdown = ({
   filter,
   filterParentKey,
}: Props) => {
    const dispatch = useDispatch();
    const mapFilters: MapFilters = useSelector((state: MapStore) => state.mapFilters);

    const {field, label, options} = filter;

    const filterValue = mapFilters[filterParentKey][field];

    const handleOptionChange = (selection: string) => {
        dispatch(setFilters({[filterParentKey]: {[field]: selection}}));
    }

    const filteredOptions = useMemo(() => {
        const formatForSort = (val: string) => {
            if (isNaN(parseFloat(val))) {
                return val.toLowerCase();
            }

            return +val;
        };

        return options?.filter(f => f)
            .sort((a: string, b: string) => (formatForSort(a) > formatForSort(b) ? 1 : -1))
    }, [options])

    const dropdownTitle = filterValue ? filterValue : `Select ${label}`
    return (
        <DropdownButton
            id={`filter-dropdown-${field}`}
            key={`filter-dropdown-${field}`}
            size="sm"
            title={dropdownTitle}
            onSelect={handleOptionChange}
            variant="outline-secondary"
        >
            <Dropdown.Item active={filterValue === ''} eventKey="">All</Dropdown.Item>
            {filteredOptions.map((option) => (
                <Dropdown.Item key={option} eventKey={option} active={filterValue === option}>{option}</Dropdown.Item>
            ))}
        </DropdownButton>
    );
}