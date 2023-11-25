import PageHeader from "../../components/text/PageHeader.tsx";
import type {SxProps, Theme} from "@mui/material";
import {Box, Button, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import MediumText from "../../components/text/MediumText.tsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import ProjectUsersTableQuery from "./ProjectUsersTableQuery.tsx";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import {parseDatePickerDate} from "../../components/inputFields/utils/parse-datepicker-date.ts";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {ProjectEditFormSchema, projectEditFormSchema} from "./schemas/project-edit-form-schema.ts";
import {CreateProjectCommand, ProjectsClient, UpdateProjectCommand} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";

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
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const ProjectEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const auth = useAuthentication();
    const navigate = useNavigate();
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const { id } = useParams();
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [types, setTypes] = useState({
        inner: 'külsős',
        outer: 'belsős'
    });
    const [statusOptions, setStatusOptions] = useState({
        inPlanning: 'Tervezés alatt',
        underCoding: 'Fejlesztés alatt',
        completed: 'Kész'
    });
    const [managers, setManagers] = useState([]);//TODO: kell api hívás ami csak a managereket adja vissza

    const {
        control,
        reset,
        setValue,
        handleSubmit,
        formState: { isValid },
    } = useForm<ProjectEditFormSchema>({
        defaultValues: {
            title: null,
            partner: null,
            projectStatus: 0,
            projectType: 0,
            estimatedStartDate: null,
            estimatedEndDate: null,
            estimatedHours: 0,
            startDate: null,
            endDate: null,
            estimatedGrossEarnings: null,
            estimatedGrossExpenditure: null,
            requireDescriptionForTimeEntry: false, //TODO: kivenni a backendből
            projectManagerId: null,
            // TODO: missing inputs from backend: realHours, realGrossEarnings, realGrossExpenditure!!!!!!!!
        },
        resolver: zodResolver(projectEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createProject = (data) => {
        const projectsClient = new ProjectsClient(BackendUrl, auth.http);
        return projectsClient.createProject( new CreateProjectCommand(data))
            .then(response => {
                navigate(`/projects`); // todo open in view mode
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateProject = (id, data) => {
        const projectsClient = new ProjectsClient(BackendUrl, auth.http);
        return projectsClient.updateProject( id, new UpdateProjectCommand(data))
            .then(response => {
                navigate(`/projects`); // todo open in view mode
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => { //TODO: fetch errort dob
        if (id) {
            const projectsClient = new ProjectsClient(BackendUrl, auth.http);
            projectsClient.getProject(parseInt(id))
                .then(response => {
                    reset(response);
                })
        }
    }, [id, reset]);

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            updateProject(id, submitData);
            setInputDisabled(true);
        } else {
            createProject(submitData);
            setInputDisabled(true);
        }
    });

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.PROJECT_NAME')}/>
            {inputDisabled && (
                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked} />
                </Box>
            )}
            <ContentCard>
                <Grid sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.TYPE')} />
                                <SelectInput
                                    label={t('TEXT.TYPE')}
                                    control={control}
                                    name='type'
                                    disabled={inputDisabled}
                                    options={Object.values(types).map((projectType) => ({
                                        id: projectType,
                                        title: projectType
                                    }))}
                                    data-testid='type-input'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setValue('type', undefined)} edge="end" >
                                                    <ClearRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '.MuiSelect-icon': {
                                                display: 'none',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.PROJECT_NAME')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.PROJECT_NAME')}
                                    control={control}
                                    name='title'
                                    type='text'
                                    data-testid='title-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.PARTNER')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.PARTNER')}
                                    control={control}
                                    name='partner'
                                    type='text'
                                    data-testid='partner-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_START_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.ESTIMATED_START_DATE')}
                                    control={control}
                                    name='estimatedStartDate'
                                    parseDate={parseDatePickerDate}
                                    data-testid='estimated-start-date'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_HOURS')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_HOURS')}
                                    control={control}
                                    name='estimatedHours'
                                    type='text'
                                    data-testid='estimated-hours-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.START_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.START_DATE')}
                                    control={control}
                                    name='startDate'
                                    parseDate={parseDatePickerDate}
                                    data-testid='start-date'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_VALUE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_VALUE')}
                                    control={control}
                                    name='estimatedGrossEarnings'
                                    type='text'
                                    data-testid='estimated-value-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_EXPENDITURE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_EXPENDITURE')}
                                    control={control}
                                    name='estimatedGrossExpenditure'
                                    type='text'
                                    data-testid='estimated-gross-expenditure-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.STATUS')} />
                                <SelectInput
                                    label={t('TEXT.STATUS')}
                                    control={control}
                                    name='status'
                                    disabled={inputDisabled}
                                    options={Object.values(statusOptions).map((projectStatus) => ({
                                        id: projectStatus,
                                        title: projectStatus
                                    }))}
                                    data-testid='status-input-input'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setValue('status', undefined)} edge="end" >
                                                    <ClearRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '.MuiSelect-icon': {
                                                display: 'none',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.PROJECT_MANAGER')} />
                                <SelectInput
                                    label={t('TEXT.PROJECT_MANAGER')}
                                    control={control}
                                    name='projectManagerId'
                                    disabled={inputDisabled}
                                    options={Object.values(managers).map((manager) => ({
                                        id: manager.id, //TODO
                                        title: manager.name //TODO
                                    }))}
                                    data-testid='type-input'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setValue('projectManagerId', undefined)} edge="end" >
                                                    <ClearRoundedIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '.MuiSelect-icon': {
                                                display: 'none',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_END_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.ESTIMATED_END_DATE')}
                                    control={control}
                                    name='estimatedEndDate'
                                    parseDate={parseDatePickerDate}
                                    data-testid='estimated-end-date'
                                    disabled={inputDisabled}
                                 />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.REAL_HOURS')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.REAL_HOURS')}
                                    control={control}
                                    name='realHours'
                                    type='text'
                                    data-testid='real-hours-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.END_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.END_DATE')}
                                    control={control}
                                    name='endDate'
                                    parseDate={parseDatePickerDate}
                                    data-testid='end-date'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.REAL_VALUE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.REAL_VALUE')}
                                    control={control}
                                    name='realGrossEarnings'
                                    type='text'
                                    data-testid='real-value-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.REAL_EXPENDITURE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.REAL_EXPENDITURE')}
                                    control={control}
                                    name='realGrossExpenditure'
                                    type='text'
                                    data-testid='real-gross-expenditure-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                    <MediumText text={t('TEXT.PROJECT_PARTICIPANTS')} />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {!isEditing && (
                            <Button
                                disabled={!!selectionModel.length}
                                sx={ addButtonStyle }
                                startIcon={<AddRoundedIcon />}
                                component={Link}
                                to="new"
                                state={{ queryParams: location.search }}
                                data-testid='add-employee-button'
                            >
                                {t('TEXT.ADD_EMPLOYEE')}
                            </Button>
                        )}
                        {isEditing && (
                            <Button
                                disabled={!!selectionModel.length}
                                sx={ addButtonStyle }
                                startIcon={<AddRoundedIcon />}
                                data-testid='add-employee-button'
                            >
                                {t('TEXT.ADD_EMPLOYEE')}
                            </Button>
                        )}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', marginTop: 7, marginBottom: 10}}>
                    <ProjectUsersTableQuery />
                </Box>

                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <CancelButton text={t('TEXT.CANCEL')} />
                    <SaveButton text={t('TEXT.SAVE')} disabled={!isValid} onClick={onSubmit}/>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectEdit;