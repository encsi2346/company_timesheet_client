import type { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';

const useSelection = (defaultSelection?: GridSelectionModel) => {
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>(defaultSelection ?? []);

    const handleSelectionChange = (selectionModel: GridSelectionModel) => {
        setSelectionModel(selectionModel);
    };

    const resetSelection = () => {
        setSelectionModel([]);
    };

    return { selectionModel, handleSelectionChange, resetSelection };
};

export default useSelection;
