import type { GridSelectionModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import UserTable from "./UserTable.tsx";

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

const UserTableQuery = ({
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
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);

    const userData = [
        {
            id: 1,
            fullName: 'Példa Elek',
            seniority: 'Senior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt1'
        },
        {
            id: 2,
            fullName: 'Példa Tibor',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt2'
        },
        {
            id: 3,
            fullName: 'Példa Zoltán',
            seniority: 'Medior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt1'
        },
        {
            id: 4,
            fullName: 'Példa Kata',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            currentProject: 'B Projekt1'
        },
        {
            id: 5,
            fullName: 'Példa Sára',
            seniority: 'Senior',
            position: 'Szoftverfejlesztő',
            currentProject: 'A Projekt'
        },
        {
            id: 6,
            fullName: 'Példa Elek',
            seniority: 'Senior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt1'
        },
        {
            id: 7,
            fullName: 'Példa Tibor',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt2'
        },
        {
            id: 8,
            fullName: 'Példa Zoltán',
            seniority: 'Medior',
            position: 'Szoftverfejlesztő',
            currentProject: 'Projekt1'
        },
        {
            id: 9,
            fullName: 'Példa Kata',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            currentProject: 'B Projekt1'
        },
        {
            id: 10,
            fullName: 'Példa Sára',
            seniority: 'Senior',
            position: 'Szoftverfejlesztő',
            currentProject: 'A Projekt'
        },
        {
            id: 11,
            fullName: 'Példa Sára',
            seniority: 'Senior',
            position: 'Szoftverfejlesztő',
            currentProject: 'A Projekt'
        }
    ];

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <UserTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={userData}
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

export default UserTableQuery;
