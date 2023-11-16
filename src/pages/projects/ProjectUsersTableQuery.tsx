import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import ProjectUsersTable from "./ProjectUsersTable.tsx";

interface Props {
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
}

const ProjectUsersTableQuery = ({
   allowSelection = false,
   allowNavigation = true,
   showActions = true,
   enableQueryParams = true,
}: Props) => {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);

    const projectData = [
        {
            id: 1,
            fullName: 'Példa Elek',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            value: 2300,
        },
        {
            id: 2,
            fullName: 'Példa Éva',
            seniority: 'Senior',
            position: 'Projekt manager',
            value: 3500,
        },
        {
            id: 3,
            fullName: 'Példa Zoltán',
            seniority: 'Junior',
            position: 'Szoftverfejlesztő',
            value: 2300,
        }
    ];

    return (
        <ProjectUsersTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={projectData}
            defaultPagination={pagination}
            defaultSort={sort}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
        />
    );
};

export default ProjectUsersTableQuery;
