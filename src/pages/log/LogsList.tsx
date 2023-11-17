import {Box} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import LogsFilter from "./LogsFilter.tsx";
import { isEqual } from 'lodash';
import {useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import omitEmptyValues from "../../components/inputFields/utils/omit-empty-values.tsx";
import LogsTableQuery from "./LogsTableQuery.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

const LogsList = () => {
    const { t } = useTypeSafeTranslation();
    const [filters, setFilters] = useState({});
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const actualFilters = omitEmptyValues(filters);

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.ACTIVITIES')}/>

            <Box sx={{ display: 'flex', marginTop: 2}}>
                <LogsFilter
                    onFiltersChanged={(newFilters) => {
                        if (isEqual(newFilters, filters)) {}
                        setFilters(newFilters);
                    }}
                />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10}}>
                    <LogsTableQuery
                        filters={actualFilters}
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};


export default LogsList;