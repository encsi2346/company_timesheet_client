import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import UserProjectTable from "./UserProjectTable.tsx";

interface Props {
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
}

const UserProjectTableQuery = ({
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
            projectName: 'Projekt1',
            projectManager: 'Példa Elek',
        },
        {
            id: 2,
            projectName: 'A Projekt',
            projectManager: 'Példa Zoltán',
        },
        {
            id: 3,
            projectName: 'B Projekt',
            projectManager: 'Példa Kata',
        },
        {
            id: 4,
            projectName: 'Projekt2',
            projectManager: 'Példa Kata',
        }
    ];

    return (
        <UserProjectTable
            allowSelection={allowSelection}
            allowNavigation={allowNavigation}
            showActions={showActions}
            data={userData}
            defaultPagination={pagination}
            defaultSort={sort}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onSortChange={handleSortChange}
        />
    );
};

export default UserProjectTableQuery;
