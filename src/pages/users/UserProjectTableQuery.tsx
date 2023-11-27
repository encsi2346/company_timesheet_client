import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import UserProjectTable from "./UserProjectTable.tsx";
import {useEffect, useState} from "react";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {ParticipationClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";

interface Props {
    onDataChange?: () => void;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    enableQueryParams?: boolean;
    employeeId?: number;
}

const UserProjectTableQuery = ({
    onDataChange,
    allowSelection = false,
    allowNavigation = true,
    showActions = true,
    enableQueryParams = true,
    employeeId,
}: Props) => {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);

    const [userData, setUserData] = useState([])

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    const auth = useAuthentication();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var participationClient = new ParticipationClient(BackendUrl, auth.http);
            participationClient.employeeAll(employeeId).then((response) => {
                const userData = response.map((user) => {
                    return {
                        id: user.id,
                        projectId: user.projectId,
                        projectTitle: user.projectTitle,
                        employeeFamilyName: user.employeeFamilyName,
                        employeeGivenName: user.employeeGivenName,
                        employeeId: user.employeeId,
                        role: user.role,
                        hourlyRate: user.hourlyRate,
                    };
                });
                setUserData(userData);
            });
        }
    }, [auth.isAuthenticated]);

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
