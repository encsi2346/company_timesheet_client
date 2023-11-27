import { Pagination } from '@modules/components/inputFields/hooks/usePagination.tsx';
import { Sort } from '@modules/components/inputFields/hooks/useSort.tsx';
import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicDataGrid, {basicDataGridProps, handleDataGridCellClick} from "../../components/inputFields/DataTable/BasicDataGrid.tsx";
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

const LogsTable = ({
  data,
  selectionModel,
  defaultPagination,
  defaultSort,
  allowSelection = false,
  allowNavigation = true,
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
            field: 'email',
            headerName: t('TEXT.EMAIL'),
            width: 280,
        },
        {
            field: 'projectName',
            headerName: t('TEXT.PROJECT'),
            width: 270,
        },
        {
            field: 'timestamp', //TODO: formatting on backend
            headerName: t('TEXT.DATE'),
            width: 270,
        },
        {
            field: 'description',
            headerName: t('TEXT.DESCRIPTION'),
            width: 450,
        },
    ];

    return (
        <BasicDataGrid
            {...basicDataGridProps}
            pagination
            rows={data ?? []}
            columns={columns}
            rowHeight={data?.length ? 48 : 120}
            rowCount={data?.length ?? 0}
            checkboxSelection={allowSelection}
            selectionModel={selectionModel ?? []}
            data-testid='log-table'
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
                    sortModel: [{ field: defaultSort?.sortBy ?? 'date', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default LogsTable;
