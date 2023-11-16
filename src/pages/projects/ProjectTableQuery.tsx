import type { GridSelectionModel } from '@mui/x-data-grid';
import { useEffect } from 'react';
import ProjectTable from "./ProjectTable.tsx";
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";

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

const ProjectTableQuery = ({
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
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'projectName', sortDir: 'asc' }, enableQueryParams);

    const projectData = [
        {
            id: 1,
            projectName: 'Project1',
            type: 'inside',
            projectManager: 'Példa Éva',
            status: 'Under coding'
        },
        {
            id: 2,
            projectName: 'Project2',
            type: 'inside',
            projectManager: 'Példa Éva',
            status: 'Under coding'
        },
        {
            id: 3,
            projectName: 'B Project',
            type: 'inside',
            projectManager: 'Példa Éva',
            status: 'Under coding'
        },
        {
            id: 4,
            projectName: 'A Project',
            type: 'inside',
            projectManager: 'Példa Éva',
            status: 'Under coding'
        },
        {
            id: 5,
            projectName: 'C Project',
            type: 'inside',
            projectManager: 'Példa Éva',
            status: 'Under coding'
        }
    ];

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectData]);

    return (
        <ProjectTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={projectData}
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

export default ProjectTableQuery;
