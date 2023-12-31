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
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import ProjectUsersTableQuery from "./ProjectUsersTableQuery.tsx";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import {parseDatePickerDate} from "../../components/inputFields/utils/parse-datepicker-date.ts";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {ProjectEditFormSchema, projectEditFormSchema} from "./schemas/project-edit-form-schema.ts";
import {
    CreateProjectCommand,
    EmployeesClient,
    ProjectsClient,
    UpdateProjectCommand,
    UsersClient
} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {useModal} from "@ebay/nice-modal-react";
import AddEmployeeDialog from "./AddEmployeeDialog.tsx";

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
    const addEmployeeDialog = useModal(AddEmployeeDialog);
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();
    const [reload, setReload] = useState(false);

    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    
    const projectTypes = {
        0: 'TEXT.PROJECT_TYPE_ENUM.0',
        1: 'TEXT.PROJECT_TYPE_ENUM.1',
        2: 'TEXT.PROJECT_TYPE_ENUM.2'
    };
    const projectStatuses = {
        0: 'TEXT.PROJECT_STATUS_ENUM.0',
        1: 'TEXT.PROJECT_STATUS_ENUM.1',
        2: 'TEXT.PROJECT_STATUS_ENUM.2',
        3: 'TEXT.PROJECT_STATUS_ENUM.3'
    };
    const [managers, setManagers] = useState([]);
    const [managersLoading, setManagersLoading] = useState(false);
    
    useEffect(() => {
        if (!managersLoading) {
            setManagersLoading(true);
            const usersClient = new EmployeesClient(BackendUrl, auth.http);
            usersClient.getEmployeeList(true)
                .then(response => {
                    setManagers(response.map((manager) => {
                        return {
                            id: manager.id,
                            title: manager.givenName + ' ' + manager.familyName
                        }
                    }));
                });
        }
    }, []);

    const {
        control,
        reset,
        setValue,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm<ProjectEditFormSchema>({
        defaultValues: {
            title: '',
            partner: '',
            projectStatus: 0,
            projectType: 0,
            estimatedHours: 0,
            estimatedGrossEarnings: 0,
            estimatedGrossExpenditure: 0,
            requireDescriptionForTimeEntry: false,
            projectManagerId: null,
        },
        resolver: zodResolver(projectEditFormSchema(isEditing)),
        mode: 'all',
    });

    const projectName = watch('title');

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
        return projectsClient.updateProject( id, new UpdateProjectCommand({id: id, ...data}))
            .then(response => {
                navigate(`/projects`); // todo open in view mode
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
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

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };
    
    const handleEmployeeAdded = () => {
        setReload(!reload);
    };

    const openAddEmployeeDialog = () => {
        addEmployeeDialog
            .show({
                title: t('TEXT.ADD_EMPLOYEE'),
                acceptText: t('TEXT.SAVE'),
                handleEmployeeAdded: handleEmployeeAdded,
            })
            .then((value) => {
                setValue('employees', value as string[]);
            })
            .catch(() => null);
    };
    
    const enumToOptions = (enumObject) => {
        return Object.keys(enumObject).map((key) => ({
            id: key,
            title: t(enumObject[key])
        }));
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={(projectName !== '' && projectName !== null) ?  projectName : t('TEXT.PROJECT_NAME')}/>
            {inputDisabled && (
                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked} />
                </Box>
            )}
            <ContentCard>
                <Grid sx={{ flexGrow: 1, marginBottom: 5 }}>
                    <Grid container spacing={6}>
                        <Grid item xs={4} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.TYPE')} />
                                <SelectInput
                                    label={t('TEXT.TYPE')}
                                    control={control}
                                    name='projectType'
                                    disabled={inputDisabled}
                                    options={enumToOptions(projectTypes)}
                                    data-testid='type-input'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setValue('projectType', undefined)} edge="end" >
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
                                <NormalText text={t('TEXT.ESTIMATED_START_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.ESTIMATED_START_DATE')}
                                    control={control}
                                    name='estimatedStartDate'
                                    data-testid='estimated-start-date'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.START_DATE')} />
                                <DatePickerInput
                                    label={t('TEXT.START_DATE')}
                                    control={control}
                                    name='startDate'
                                    data-testid='start-date'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_HOURS')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_HOURS')}
                                    control={control}
                                    name='estimatedHours'
                                    type='number'
                                    data-testid='estimated-hours-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.ESTIMATED_VALUE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_VALUE')}
                                    control={control}
                                    name='estimatedGrossEarnings'
                                    type='number'
                                    data-testid='estimated-value-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={t('TEXT.STATUS')} />
                                <SelectInput
                                    label={t('TEXT.STATUS')}
                                    control={control}
                                    name='projectStatus'
                                    disabled={inputDisabled}
                                    options={enumToOptions(projectStatuses)}
                                    data-testid='status-input'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setValue('projectStatus', undefined)} edge="end" >
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
                                <NormalText text={t('TEXT.PROJECT_MANAGER')} />
                                <SelectInput
                                    label={t('TEXT.PROJECT_MANAGER')}
                                    control={control}
                                    name='projectManagerId'
                                    disabled={inputDisabled}
                                    options={managers}
                                    data-testid='project-type-input'
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
                                <NormalText text={t('TEXT.ESTIMATED_EXPENDITURE')} />
                                <TextFieldInput
                                    placeholder={t('TEXT.ESTIMATED_EXPENDITURE')}
                                    control={control}
                                    name='estimatedGrossExpenditure'
                                    type='number'
                                    data-testid='estimated-gross-expenditure-input'
                                    disabled={inputDisabled}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {isEditing && (
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                            <MediumText text={t('TEXT.PROJECT_PARTICIPANTS')} />

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Button
                                    disabled={!!selectionModel.length}
                                    sx={ addButtonStyle }
                                    startIcon={<AddRoundedIcon />}
                                    onClick={openAddEmployeeDialog}
                                    data-testid='add-employee-button'
                                >
                                    {t('TEXT.ADD_EMPLOYEE')}
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', marginTop: 7, marginBottom: 10, minHeight: 300}}>
                            <ProjectUsersTableQuery
                                selectionModel={selectionModel}
                                onSelectionChange={handleSelectionChange}
                                onDataChange={handleDataChange}
                                projectId={id ?? 0}
                                reload={reload}
                                setReload={setReload}
                            />
                        </Box>
                    </Box>
                )}

                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SAVE')} disabled={!isValid} onClick={onSubmit}/>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectEdit;