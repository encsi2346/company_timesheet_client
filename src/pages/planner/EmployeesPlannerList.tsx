import {Box, FormControl, Input, InputAdornment, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import EmployeesPlannerTableQuery from "./EmployeesPlannerTableQuery.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {WorkMonthsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";
import SaveButton from "../../components/button/SaveButton.tsx";

const EmployeesPlannerList = () => {
    const { t } = useTypeSafeTranslation();
    const auth = useAuthentication();
    const { palette } = useTheme();
    const [planners, setPlanners] = useState([]);
    const [search, setSearch] = useState('');
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var workMonthsClient = new WorkMonthsClient(BackendUrl, auth.http);
            workMonthsClient.getListWorkMonths().then((response) => {
                const planners = response.map((planner) => {
                    return {
                        //id: Math.floor(Math.random() * 1000000),
                        id: planner.id, //TODO: create new api request for this
                    };
                });
                setPlanners(planners);
            });
        }
    }, [auth.isAuthenticated]);

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.MY_EMPLOYEES_PLANNER')}/>

            <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2, alignItems: 'center'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FormControl sx={{ marginTop: 5, marginBottom: 5, marginLeft: 2, marginRight: 80}}>
                        <Input
                            id="employeeName"
                            placeholder="Employee name"
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `${palette.component.medium}`,
                                borderRadius: '13px',
                                color: `${palette.textColor.light}`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <SaveButton text={t('TEXT.OPENING_MONTH')} />
                        <SaveButton text={t('TEXT.CLOSING_MONTH')} />
                    </Box>
                </Box>
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <EmployeesPlannerTableQuery
                        searchResults={
                            planners
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.title.toLowerCase().includes(search);
                                })
                        }
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