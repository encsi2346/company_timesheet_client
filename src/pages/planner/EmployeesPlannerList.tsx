import {Box} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import EmployeesPlannerFilter from "./EmployeesPlannerFilter.tsx";
import { isEqual } from 'lodash';
import {useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import omitEmptyValues from "../../components/inputFields/utils/omit-empty-values.tsx";
import EmployeesPlannerTableQuery from "./EmployeesPlannerTableQuery.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

const EmployeesPlannerList = () => {
    const { t } = useTypeSafeTranslation();
    const [filters, setFilters] = useState({});
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const actualFilters = omitEmptyValues(filters);

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.MY_EMPLOYEES_PLANNER')}/>

            <Box sx={{ display: 'flex', marginTop: 2}}>
                <EmployeesPlannerFilter
                    onFiltersChanged={(newFilters) => {
                        if (isEqual(newFilters, filters)) {}
                        setFilters(newFilters);
                    }}
                />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <EmployeesPlannerTableQuery
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

export default EmployeesPlannerList;