import {Box, FormControl, Input, InputAdornment, useTheme} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import LogsTableQuery from "./LogsTableQuery.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {AuditLogsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";

const LogsList = () => {
    const { t } = useTypeSafeTranslation();
    const { palette } = useTheme();
    const auth = useAuthentication();
    const [search, setSearch] = useState('');
    const [logsData, setLogsData] = useState([])
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var auditLogsClient = new AuditLogsClient(BackendUrl, auth.http);
            auditLogsClient.getAuditLogList().then((response) => {
                const logsData = response.map((log) => {
                    return {
                        id: log.id,
                        projectName: log.projectName,
                        userName: log.userName,
                        description: log.description,
                        timestamp: log.timestamp,
                    };
                });
                setLogsData(logsData);
            });
        }
    }, [auth.isAuthenticated]);

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.ACTIVITIES')}/>

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
                    </Box>
                </Box>
            </Box>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10}}>
                    <LogsTableQuery
                        searchResults={
                            logsData
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.projectName.toLowerCase().includes(search);
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


export default LogsList;