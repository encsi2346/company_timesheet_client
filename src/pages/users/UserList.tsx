import {Box, Button} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import UserFilter from "./UserFilter.tsx";
import {useState} from "react";
import { isEqual } from 'lodash';
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import omitEmptyValues from "../../components/inputFields/utils/omit-empty-values.tsx";
import UserTableQuery from "./UserTableQuery.tsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {Link, useLocation} from "react-router-dom";
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

const UserList = ({ onCreateClicked }: Props) => {
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
                <PageHeader text={t('TEXT.EMPLOYEES')} />

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
                            `${t('TEXT.NEW_EMPLOYEE')}`
                        </Button>
                    )}
                    {onCreateClicked && (
                        <Button
                            disabled={!!selectionModel.length}
                            sx={ addButtonStyle }
                            startIcon={<AddRoundedIcon />}
                            onClick={onCreateClicked}
                        >
                            `${t('TEXT.NEW_EMPLOYEE')}`
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', marginTop: 2}}>
                <UserFilter
                    onFiltersChanged={(newFilters) => {
                        if (isEqual(newFilters, filters)) {}
                        setFilters(newFilters);
                    }}
                />
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <UserTableQuery
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


export default UserList;