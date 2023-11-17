import {Box, Button} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ProjectFilter from "./ProjectFilter.tsx";
import { isEqual } from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import ProjectTableQuery from "./ProjectTableQuery.tsx";
import {useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import omitEmptyValues from "../../components/inputFields/utils/omit-empty-values.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

const addButtonStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '80px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

interface Props {
    onCreateClicked?: () => void;
}

const ProjectList = ({ onCreateClicked }: Props) => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const [filters, setFilters] = useState({});
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const actualFilters = omitEmptyValues(filters);

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <PageHeader text={t('TEXT.PROJECTS')}/>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {!onCreateClicked && (
                        <Button
                            disabled={!!selectionModel.length}
                            sx={ addButtonStyle }
                            startIcon={<AddRoundedIcon />}
                            component={Link}
                            to="new"
                            state={{ queryParams: location.search }}
                        >
                            {t('TEXT.NEW_PROJECT')}
                        </Button>
                    )}
                    {onCreateClicked && (
                        <Button
                            disabled={!!selectionModel.length}
                            sx={ addButtonStyle }
                            startIcon={<AddRoundedIcon />}
                            onClick={onCreateClicked}
                        >
                            {t('TEXT.NEW_PROJECT')}
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', marginTop: 2}}>
                <ProjectFilter
                    onFiltersChanged={(newFilters) => {
                        if (isEqual(newFilters, filters)) {}
                        setFilters(newFilters);
                    }}
                />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 500}}>
                    <ProjectTableQuery
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

export default ProjectList;