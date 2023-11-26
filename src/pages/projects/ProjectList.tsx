import {Box, Button, FormControl, Input, InputAdornment, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import PageHeader from "../../components/text/PageHeader.tsx";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link, useLocation } from 'react-router-dom';
import ProjectTableQuery from "./ProjectTableQuery.tsx";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";
import {ProjectsClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

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
    const auth = useAuthentication();
    const { palette } = useTheme();
    const location = useLocation();
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState('');
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    useEffect(() => {
        if (auth.isAuthenticated === true) {
            var projectClient = new ProjectsClient(BackendUrl, auth.http);
            projectClient.getProjectsList().then((response) => {
                const projectData = response.map((project) => {
                    return {
                        //id: Math.floor(Math.random() * 1000000),
                        id: project.id,
                        title: project.title,
                        projectType: project.projectType,
                        projectManager: project.projectManagerFamilyName + ' ' + project.projectManagerGivenName,
                        projectStatus: project.projectStatus,
                    };
                });
                setProjects(projectData);
            });
        }
    }, [auth.isAuthenticated]);

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
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 500}}>
                    <ProjectTableQuery
                        searchResults={
                            projects
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

export default ProjectList;