import { Pagination } from '@modules/components/inputFields/hooks/usePagination.tsx';
import { Sort } from '@modules/components/inputFields/hooks/useSort.tsx';
import type { GridActionsColDef, GridColDef, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledDataGrid, {
    handleDataGridCellClick,
    sharedDataGridProps
} from "../../components/inputFields/DataTable/StyledDataGrid.tsx";
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

const ProjectTable = ({
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
            field: 'projectName',
            headerName: t('TEXT.PROJECT_NAME'),
            width: 250,
        },
        {
            field: 'type',
            headerName: t('TEXT.TYPE'),
            width: 250,
        },
        {
            field: 'projectManager',
            headerName: t('TEXT.PROJECT_MANAGER'),
            width: 250,
        },
        {
            field: 'status',
            headerName: t('TEXT.STATUS'),
            width: 250,
        },
    ];

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
                    sortModel: [{ field: defaultSort?.sortBy ?? 'projectName', sort: defaultSort?.sortDir ?? 'asc' }],
                },
                pagination: { page: defaultPagination?.page, pageSize: defaultPagination?.pageSize },
            }}
        />
    );
};

export default ProjectTable;
