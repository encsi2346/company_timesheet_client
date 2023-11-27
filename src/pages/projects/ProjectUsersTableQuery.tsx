import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import ProjectUsersTable from "./ProjectUsersTable.tsx";
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
    projectId?: number;
}

const ProjectUsersTableQuery = ({
    onDataChange,
    allowSelection = false,
    allowNavigation = true,
    showActions = true,
    enableQueryParams = true,
    projectId,
}: Props) => {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination(undefined, undefined, enableQueryParams);
    const { sort, sortParam, handleSortChange } = useSort({ sortBy: 'fullName', sortDir: 'asc' }, enableQueryParams);

    const [projectData, setProjectData] = useState([])

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectData]);

    const auth = useAuthentication();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var participationClient = new ParticipationClient(BackendUrl, auth.http);
            participationClient.project(projectId).then((response) => {
                const projectData = response.map((project) => {
                    return {
                        id: project.id,
                        projectId: project.projectId,
                        projectTitle: project.projectTitle,
                        employeeFamilyName: project.employeeFamilyName,
                        employeeGivenName: project.employeeGivenName,
                        employeeId: project.employeeId,
                        role: project.role,
                        hourlyRate: project.hourlyRate,
                    };
                });
                setProjectData(projectData);
            });
        }
    }, [auth.isAuthenticated]);

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
