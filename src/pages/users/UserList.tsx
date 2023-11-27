import {Box, Button, FormControl, Input, InputAdornment, useMediaQuery, useTheme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import UserTableQuery from "./UserTableQuery.tsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {Link, useLocation} from "react-router-dom";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {EmployeesClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";

interface Props {
    onCreateClicked?: () => void;
}

const UserList = ({ onCreateClicked }: Props) => {
    const isBigScreen = useMediaQuery('(min-width: 1200px)');
    const isMediumScreen = useMediaQuery('(min-width: 501px)' && '(max-width: 1200px)');
    const isSmallScreen = useMediaQuery('(max-width: 500px)');

    const { t } = useTypeSafeTranslation();
    const theme = useTheme();
    const location = useLocation();
    const [userData, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const auth = useAuthentication();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var employeesClient = new EmployeesClient(BackendUrl, auth.http);
            employeesClient.getEmployeeList().then((response) => {
                const userData = response.map((user) => {
                    return {
                        id: user.id,
                        givenName: user.givenName,
                        familyName: user.familyName,
                        jobTitle: user.jobTitle,
                    };
                });
                setUsers(userData);
            });
        }
    }, [auth.isAuthenticated]);

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
                            data-testid='new-employee-button'
                            sx={{
                                backgroundColor: `${theme.palette.component.darkMax}`,
                                color: `${theme.palette.textColor.light}`,
                                fontWeight: 'regular',
                                fontSize: '14px',
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
                            }}
                            startIcon={<AddRoundedIcon />}
                            component={Link}
                            to="new"
                            state={{ queryParams: location.search }}
                        >
                            {t('TEXT.NEW_EMPLOYEE')}
                        </Button>
                    )}
                    {onCreateClicked && (
                        <Button
                            disabled={!!selectionModel.length}
                            data-testid='new-employee-button'
                            sx={{
                                backgroundColor: `${theme.palette.component.darkMax}`,
                                color: `${theme.palette.textColor.light}`,
                                fontWeight: 'regular',
                                fontSize: '14px',
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
                            }}
                            startIcon={<AddRoundedIcon />}
                            onClick={onCreateClicked}
                        >
                            {t('TEXT.NEW_EMPLOYEE')}
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', marginTop: 2}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <FormControl sx={{ marginTop: 1, marginBottom: 5, marginLeft: 2}}>
                            <Input
                                id="projectName"
                                placeholder="Project name"
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
                                    backgroundColor: `${theme.palette.component.medium}`,
                                    borderRadius: '13px',
                                    color: `${theme.palette.textColor.light}`,
                                    textDecoration: 'none',
                                    height: 40,
                                    width: 250,
                                    fontSize: "15px",
                                    paddingLeft: 1,
                                    paddingRight: 1
                                }}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <UserTableQuery
                        searchResults={
                            userData
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.familyName.toLowerCase().includes(search);
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


export default UserList;