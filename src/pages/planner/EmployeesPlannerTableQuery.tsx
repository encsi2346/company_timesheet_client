import type { GridSelectionModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import EmployeesPlannerTable from "./EmployeesPlannerTable.tsx";

interface Props {
    filters: string[];
    selectionModel?: GridSelectionModel;
    onSelectionChange?: (selectionModel: GridSelectionModel) => void;
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
    searchResults?: string[];
}

const EmployeesPlannerTableQuery = ({
    filters,
    selectionModel = [],
    onSelectionChange,
    onDataChange,
    allowSelection = true,
    allowNavigation = true,
    showActions = true,
    enableQueryParams = true,
    searchResults,
}: Props) => {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults]);

    /*const employeesData = [
        {
            id: 1,
            fullName: 'Példa Elek',
            workedTime: '152/160',
            holidayTime: '8',
            fullTime: '160/160',
            closingTime: '2023.10.02. 12:56'
        },
        {
            id: 2,
            fullName: 'Példa Zoltán',
            workedTime: '160/160',
            holidayTime: '0',
            fullTime: '160/160',
            closingTime: '-'
        },
        {
            id: 3,
            fullName: 'Példa Kata',
            workedTime: '160/160',
            holidayTime: '0',
            fullTime: '160/160',
            closingTime: '-'
        },
        {
            id: 4,
            fullName: 'Példa Sára',
            workedTime: '148/160',
            holidayTime: '12',
            fullTime: '160/160',
            closingTime: '2023.10.02. 12:56'
        },
        {
            id: 5,
            fullName: 'Példa Péter',
            workedTime: '160/160',
            holidayTime: '0',
            fullTime: '160/160',
            closingTime: '-'
        }
    ];*/

    return (
        <EmployeesPlannerTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={searchResults}
            selectionModel={selectionModel}
            defaultPagination={pagination}
            defaultSort={sort}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
            onSelectionChange={onSelectionChange}
        />
    );
};

export default EmployeesPlannerTableQuery;
