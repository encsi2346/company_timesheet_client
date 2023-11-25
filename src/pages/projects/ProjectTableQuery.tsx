import type { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import ProjectTable from "./ProjectTable.tsx";
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import {ProjectsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";

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
*/

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
