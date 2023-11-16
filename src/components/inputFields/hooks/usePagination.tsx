import { useCallback, useEffect, useState } from 'react';

import useQueryParam from './useQueryParam.tsx';

export interface Pagination {
    page: number;
    pageSize: number;
}

const usePagination = (defaultPage?: number, defaultPageSize?: number, enableQueryParam = true) => {
    const [pagingQuery, setPagingQuery] = useQueryParam<Pagination>('pagination');

    const [pagination, setPagination] = useState({
        page: (pagingQuery?.page ?? defaultPage) || 0,
        pageSize: (pagingQuery?.pageSize ?? defaultPageSize) || 10,
    });

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        setPagination({ pageSize: newPageSize, page: 0 });
    }, []);

    const handlePageChange = (newPage: number) => {
        setPagination({ ...pagination, page: newPage });
    };

    useEffect(() => {
        if (enableQueryParam) {
            setPagingQuery(pagination, { replace: true });
        }
    }, [enableQueryParam, pagination, setPagingQuery]);

    return { pagination, handlePageSizeChange, handlePageChange };
};

export default usePagination;
