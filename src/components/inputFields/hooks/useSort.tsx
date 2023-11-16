import type { GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import useQueryParam from './useQueryParam.tsx';

export interface Sort {
    sortBy: string;
    sortDir: GridSortDirection;
}

const useSort = (defaultSort?: Sort, enableQueryParam = true) => {
    const [sortQuery, setSortQuery] = useQueryParam<Sort | null>('sort');

    const [sort, setSort] = useState<Sort | null>(sortQuery ?? defaultSort ?? null);
    const [sortModel, setSortModel] = useState<GridSortModel>();

    const handleSortChange = (sortModel: GridSortModel) => {
        if (sortModel.length) {
            setSort({ sortBy: sortModel[0].field, sortDir: sortModel[0].sort });
        } else {
            setSort(null);
        }

        setSortModel(sortModel);
    };

    useEffect(() => {
        if (enableQueryParam) {
            setSortQuery(sort, { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, enableQueryParam]);

    const sortParam = sort ? `${sort?.sortBy},${sort?.sortDir}` : undefined;

    return { sort, sortModel, sortParam, handleSortChange };
};

export default useSort;
