import React from "react";
import {FilterCheckbox} from "./FilterCheckbox";
import {FilterDropdown} from "./FilterDropdown";

export type FilterType = {
    field: string;
    label: string;
    type: string;
    options?: string[]
}

export type Props = {
    filter: FilterType;
    filterParentKey: string;
}

export const Filter = ({
    filter,
    filterParentKey,
}: Props) => {
    const { type } = filter;

    const isCheckbox = type === "boolean";

    return (
        <div className={`filter-section`}>
            {isCheckbox ? (
                <FilterCheckbox filter={filter} filterParentKey={filterParentKey} />
            ) : (
                <FilterDropdown filter={filter} filterParentKey={filterParentKey} />
            )}
        </div>
    );
}