import type { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import usePagination from "../../components/inputFields/hooks/usePagination.tsx";
import useSort from "../../components/inputFields/hooks/useSort.tsx";
import LogsTable from "./LogsTable.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";
import {AuditLogsClient, ProjectsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";

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

    const [logsData, setLogsData] = useState([])

    useEffect(() => {
        if (onDataChange) {
            onDataChange();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logsData]);

    const auth = useAuthentication();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var auditLogsClient = new AuditLogsClient(BackendUrl, auth.http);
            auditLogsClient.getAuditLogList().then((response) => {
                const logsData = response.map((log) => {
                    return {
                        id: Math.floor(Math.random() * 1000000),
                        //id: log.id, //TODO: create id on backend
                        projectName: log.projectName,
                        userName: log.userName,
                        description: log.description,
                        timestamp: log.timestamp,
                    };
                });
                setLogsData(logsData);
            });
        }
    }, [auth.isAuthenticated]);

    /*const logsData = [
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
    ];*/

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
