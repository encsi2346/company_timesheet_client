import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import useSelection from '../../components/inputFields/hooks/useSelection.tsx';
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import NormalText from "../../components/text/NormalText.tsx";
import {AddEmployeeFormSchema, addEmployeeFormSchema} from "./schemas/add-employee-form-schema.ts";
import {useEffect, useState} from "react";
import {
    CreateParticipationCommand, EmployeesClient,
    ParticipationClient, ProjectsClient
} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthProvider.tsx";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    color: '#29005C',
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    textTransform: 'uppercase'
}

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const cancelTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#29005C',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const AddEmployeeDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const auth = useAuthentication();

        const [projects, setProjects] = useState([]);

        const [employees, setEmployees] = useState([]);

        const {
            control,
            reset,
            setValue,
            handleSubmit,
            formState: { isValid },
        } = useForm<AddEmployeeFormSchema>({
            defaultValues: {
                projectId: 0,
                employeeId: 0,
                role: '',
                hourlyRate: 0,
            },
            resolver: zodResolver(addEmployeeFormSchema),
            mode: 'all',
        });

        useEffect(() => {
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
                setEmployees(userData);
            });
        }, [auth.http]);

        useEffect(() => {
            var projectClient = new ProjectsClient(BackendUrl, auth.http);
            projectClient.getProjectsList().then((response) => {
                const projectData = response.map((project) => {
                    return {
                        id: project.id,
                        title: project.title,
                        partner: project.partner,
                        projectType: project.projectType,
                        projectManager: project.projectManagerFamilyName + ' ' + project.projectManagerGivenName,
                        projectStatus: project.projectStatus,
                    };
                });
                setProjects(projectData);
            });
        }, [auth.http]);

        const addEmployeesForProject = (data) => {
            const participationClient = new ParticipationClient(BackendUrl, auth.http);
            return participationClient.postCreateParticipation( new CreateParticipationCommand(data))
                .then(response => {
                    props.handleEmployeeAdded && props.handleEmployeeAdded();
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const onSubmit = handleSubmit((data) => {
            let submitData = data as any;

            addEmployeesForProject(submitData);
        });

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title" sx={titleStyle}>
                    {props.title}
                </DialogTitle>

                <DialogContent sx={{ width: 500, height: 300, display: 'block', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1, marginTop: 1}}>
                        <NormalText text={t('TEXT.PROJECT_NAME')} />
                        <SelectInput
                            label={t('TEXT.PROJECT')}
                            control={control}
                            name='projectId'
                            options={projects.map((project) => ({
                                id: project.id,
                                title: project.title
                            }))}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setValue('projectId', undefined)} edge="end" >
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
                        <NormalText text={t('TEXT.FULL_NAME')} />
                        <SelectInput
                            label={t('TEXT.FULL_NAME')}
                            control={control}
                            name='employeeId'
                            options={employees.map((employee) => ({
                                id: employee.id,
                                title: employee.givenName + ' ' + employee.familyName,
                            }))}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={() => setValue('employeeId', undefined)} edge="end" >
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
                        <NormalText text={t('TEXT.VALUE_FOR_PROJECT')} />
                        <TextFieldInput
                            placeholder={t('TEXT.VALUE_FOR_PROJECT')}
                            control={control}
                            name='hourlyRate'
                            type='number'
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        onClick={() => {
                            modal.reject();
                            modal.remove();
                        }}
                        data-testid="cancel-button"
                        sx={cancelTitleStyle}
                    >
                        {t('TEXT.CANCEL')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit();
                            modal.remove();
                        }}
                        data-testid="confirm-button"
                        sx={saveTitleStyle}
                    >
                        {props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

export default AddEmployeeDialog;
