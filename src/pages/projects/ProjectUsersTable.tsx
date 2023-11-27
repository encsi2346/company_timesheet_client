import { Pagination } from '@modules/components/inputFields/hooks/usePagination.tsx';
import { Sort } from '@modules/components/inputFields/hooks/useSort.tsx';
import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledDataGrid, {
    handleDataGridCellClick,
    sharedDataGridProps
} from "../../components/inputFields/DataTable/StyledDataGrid.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {ParticipationClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {useAuthentication} from "../../auth/AuthProvider.tsx";

interface Props {
    data?: string[];
    defaultPagination?: Pagination;
    defaultSort?: Sort | null;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    onSortChange: (pageSize: GridSortModel) => void;
    reload: boolean;
    setReload: (reload: boolean) => void;
}

const ProjectUsersTable = ({
  data,
  defaultPagination,
  defaultSort,
  allowSelection = false,
  allowNavigation = true,
  showActions = true,
  onPageChange,
  onPageSizeChange,
  onSortChange, 
  reload, 
  setReload
}: Props) => {
    const { t } = useTypeSafeTranslation();
    const auth = useAuthentication();
    const location = useLocation();
    const navigate = useNavigate();

    const columns: (GridColDef | GridActionsColDef)[] = [
        {
            field: 'projectTitle',
            headerName: t('TEXT.PROJECT_NAME'),
            width: 250,
        },
        {
            field: 'employeeFamilyName',
            headerName: t('TEXT.FAMILY_NAME'),
            width: 250,
        },
        {
            field: 'employeeGivenName',
            headerName: t('TEXT.FIRST_NAME'),
            width: 250,
        },
        {
            field: 'hourlyRate',
            headerName: t('TEXT.VALUE_FOR_PROJECT'),
            width: 300,
        }
    ];

    const removeEmployeeFromProject = (id) => {
        console.log(id)
        const participationClient = new ParticipationClient(BackendUrl, auth.http);
        return participationClient.participationDELETE(id)
            .then(response => {
                console.log('removed employee from project');
                setReload(!reload);
            })
            .catch(error => {
                console.log(error);
            });
    };

    if (showActions) {
        columns.push({
            field: 'actions',
            headerName: t('TEXT.REMOVING'),
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`${params.id}_open`}
                    icon={
                        <Tooltip title={t('TEXT.REMOVE_EMPLOYEE')}>
                            <CloseRoundedIcon width="16px" height="16px" sx={{ color: "#ff0000"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.REMOVE_EMPLOYEE')}
                    onClick={() => removeEmployeeFromProject(params.id)}
                    data-testid='remove-button'
                />,
            ],
        });
    }

    return (
        <StyledDataGrid
            {...sharedDataGridProps}
            pagination
            rows={data ?? []}
            columns={columns}
            rowHeight={data?.length ? 48 : 120}
            rowCount={data?.length ?? 0}
            checkboxSelection={allowSelection}
            data-testid='project-users-table'
            onCellClick={(params, event) =>
                allowNavigation ? handleDataGridCellClick(params, event, navigate, location.search) : null
            }
            pageSize={data?.length ?? 10}
            onPageChange={(page) => onPageChange(page)}
            onPageSizeChange={(pageSize) => onPageSizeChange(pageSize)}
            onSortModelChange={(model) => onSortChange(model)}
            initialState={{
                sorting: {
                    sortModel: [{ field: defaultSort?.sortBy ?? 'projectTitle', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default ProjectUsersTable;
