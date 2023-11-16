import type { GridSelectionModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import LogsTable from "./LogsTable.tsx";

interface Props {
    filters: string[];
    selectionModel?: GridSelectionModel;
    onSelectionChange?: (selectionModel: GridSelectionModel) => void;
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
}

const LogsTableQuery = ({
   filters,
   selectionModel = [],
   onSelectionChange,
   onDataChange,
   allowSelection = false,
   allowNavigation = true,
   showActions = true,
   enableQueryParams = true,
}: Props) => {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'date', sortDir: 'asc' }, enableQueryParams);

    const logsData = [
        {
            id: 1,
            employeeName: 'Példa Éva',
            projectName: 'Project1',
            date: '2023.10.10. 18:56',
            description: 'Log time'
        },
        {
            id: 2,
            employeeName: 'Példa Éva',
            projectName: 'Project1',
            date: '2023.10.14. 13:12',
            description: 'Log time'
        },
        {
            id: 3,
            employeeName: 'Példa Éva',
            projectName: 'Project1',
            date: '2023.10.03. 08:56',
            description: 'Add employees for project'
        },
        {
            id: 4,
            employeeName: 'Példa Éva',
            projectName: 'Project1',
            date: '2023.10.02. 15:34',
            description: 'create new project'
        },
        {
            id: 5,
            employeeName: 'Példa Éva',
            projectName: 'Project1',
            date: '2023.10.11. 13:13',
            description: 'Log time'
        }
    ];

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logsData]);

    return (
        <LogsTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={logsData}
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

export default LogsTableQuery;
