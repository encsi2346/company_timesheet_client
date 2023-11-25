import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import ProjectUsersTable from "./ProjectUsersTable.tsx";
import {useEffect, useState} from "react";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";
import {ProjectsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";

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

    const [projectData, setProjectData] = useState([])

    /*useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectData]);*/

    const auth = useAuthentication();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var projectClient = new ProjectsClient(BackendUrl, auth.http);
            projectClient.getProjectsList().then((response) => {
                const projectData = response.map((project) => {
                    return {
                        //id: Math.floor(Math.random() * 1000000),
                        id: project.id,
                        projectName: project.title,
                        type: project.projectType,
                        projectManager: project.projectManagerFamilyName + ' ' + project.projectManagerGivenName,
                        status: project.projectStatus,
                    };
                });
                setProjectData(projectData);
            });
        }
    }, [auth.isAuthenticated]);

    /*const projectData = [
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
    ];*/

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
