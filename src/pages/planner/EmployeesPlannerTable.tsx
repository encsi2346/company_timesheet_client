import { Pagination } from '@modules/components/inputFields/hooks/usePagination.tsx';
import { Sort } from '@modules/components/inputFields/hooks/useSort.tsx';
import type {GridActionsColDef, GridColDef, GridRowParams, GridSelectionModel, GridSortModel} from '@mui/x-data-grid';
import StyledDataGrid, {
    handleDataGridCellClick,
    sharedDataGridProps
} from "../../components/inputFields/DataTable/StyledDataGrid.tsx";
import { useLocation, useNavigate } from 'react-router-dom';
import {GridActionsCellItem} from "@mui/x-data-grid";
import {Tooltip} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

interface Props {
    data?: string[];
    selectionModel?: GridSelectionModel;
    defaultPagination?: Pagination;
    defaultSort?: Sort | null;
    allowSelection?: boolean;
    allowNavigation?: boolean;
    showActions?: boolean;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    onSortChange: (pageSize: GridSortModel) => void;
    onSelectionChange?: (selection: GridSelectionModel) => void;
}

const EmployeesPlannerTable = ({
   data,
   selectionModel,
   defaultPagination,
   defaultSort,
   allowSelection = true,
   allowNavigation = true,
   showActions = true,
   onPageChange,
   onPageSizeChange,
   onSortChange,
   onSelectionChange,
}: Props) => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const columns: (GridColDef | GridActionsColDef)[] = [
        {
            field: 'fullName',
            headerName: t('TEXT.FULL_NAME'),
            width: 200,
        },
        {
            field: 'workedTime',
            headerName: t('TEXT.WORKED_TIME'),
            width: 200,
        },
        {
            field: 'holidayTime',
            headerName: t('TEXT.HOLIDAY_TIME'),
            width: 200,
        },
        {
            field: 'fullTime',
            headerName: t('TEXT.FULL_TIME'),
            width: 200,
        },
        {
            field: 'closingTime',
            headerName: t('TEXT.CLOSING_TIME'),
            width: 250,
        },
    ];

    if (showActions) {
        columns.push({
            field: 'actions',
            headerName: t('TEXT.CLOSING'),
            type: 'actions',
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    key={`${params.id}_open`}
                    icon={
                        <Tooltip title={t('TEXT.OPENING')}>
                            <LockOpenIcon width="16px" height="16px" sx={{ color: "#29005C"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.OPENING')}
                />,
                <GridActionsCellItem
                    key={`${params.id}_locked`}
                    icon={
                        <Tooltip title={t('TEXT.LOCKING')}>
                            <LockIcon width="16px" height="16px" sx={{ color: "#29005C"}}/>
                        </Tooltip>
                    }
                    label={t('TEXT.LOCKING')}
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
            selectionModel={selectionModel ?? []}
            onCellClick={(params, event) =>
                allowNavigation ? handleDataGridCellClick(params, event, navigate, location.search) : null
            }
            pageSize={data?.length ?? 10}
            onPageChange={(page) => onPageChange(page)}
            onPageSizeChange={(pageSize) => onPageSizeChange(pageSize)}
            onSortModelChange={(model) => onSortChange(model)}
            onSelectionModelChange={(selectionModel) => {
                if (onSelectionChange) {
                    onSelectionChange(selectionModel);
                }
            }}
            initialState={{
                sorting: {
                    sortModel: [{ field: defaultSort?.sortBy ?? 'fullName', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default EmployeesPlannerTable;
