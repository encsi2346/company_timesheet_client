import {Box, FormControl, Input, InputAdornment, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import EmployeesPlannerTableQuery from "./EmployeesPlannerTableQuery.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {IEmployeeWorkMonthDto, WorkMonthsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import MediumText from "../../components/text/MediumText.tsx";

const EmployeesPlannerList = () => {
    const { t } = useTypeSafeTranslation();
    const auth = useAuthentication();
    const { palette } = useTheme();
    const [months, setMonths] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [employeeMonths, setEmployeeMonths] = useState<IEmployeeWorkMonthDto[]>([]);
    const [search, setSearch] = useState('');
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var workMonthsClient = new WorkMonthsClient(BackendUrl, auth.http);
            workMonthsClient.getListWorkMonths().then((response) => {
                const months = response.map((planner) => {
                    return {
                        id: planner.id,
                        start: planner.start,
                        end: planner.end,
                    };
                });
                setMonths(months);
                months.sort((a, b) => (a.start.getTime() > b.start.getTime()) ? 1 : -1);
                setCurrentMonth(months[months.length - 1].id);
            });
        }
    }, [auth.isAuthenticated]);

    useEffect(() => {
        if (currentMonth) {
            var workMonthsClient = new WorkMonthsClient(BackendUrl, auth.http);
            workMonthsClient.workMonths(currentMonth).then((response) => {
                setEmployeeMonths(response.employeeWorkMonths);
            });
        }
    }, [auth.http, currentMonth]);

    /*useEffect(() => {
        if (auth.isAuthenticated === true) {
            var workMonthsClient = new WorkMonthsClient(BackendUrl, auth.http);
            workMonthsClient.employee().then((response) => {
                const planners = response.map((employee) => {
                    return {
                        id: employee.id,
                        start: employee.start,
                        end: employee.end,  //TODO: other fields
                    };
                });
                setPlanners(planners);
            });
        }
    }, [auth.isAuthenticated]);*/

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.MY_EMPLOYEES_PLANNER')}/>

            {/*<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -3, marginBottom: -3}}>
                <MediumText text={`${months[0].start}` + ' - ' + `${months[0].end}`}/>
            </Box>*/}
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
                            employeeMonths
                                .filter((item) => {
                                    return !search || search.toLowerCase() === ''
                                        ? item
                                        : item.employeeName.toLowerCase().includes(search);
                                })
                        }
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                        filters={[]}/>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default EmployeesPlannerList;