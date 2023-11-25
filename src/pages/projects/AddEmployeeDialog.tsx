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
import {useState} from "react";
import {CreateEmployeeCommand, EmployeesClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {useAuthentication} from "../../auth/AuthenticationHooks.ts";

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
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const auth = useAuthentication();
        const { selectionModel, handleSelectionChange } = useSelection(props.defaultSelected);

        const [projects, setProjects] = useState({
            projectA: 0,
            projectB: 1,
            projectC: 2
        });

        const [employees, setEmployees] = useState({
            userA: 0,
            UserB: 1,
            UserC: 2
        });

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
                role: '', //TODO: a role-t felesleges belevenni, vegyük ki a backendből, logikusan max a jobTitle jöhetne ide
                hourlyRate: 0,
            },
            resolver: zodResolver(addEmployeeFormSchema),
            mode: 'all',
        });

        const addEmployeesForProject = (data) => {
            const employeesClient = new EmployeesClient(BackendUrl, auth.http);
            return employeesClient.createEmployee( new CreateEmployeeCommand(data))
                .then(response => {
                    console.log('ready');
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
                            options={Object.values(projects).map((project) => ({
                                id: project,
                                title: project
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
                            options={Object.values(employees).map((employee) => ({
                                id: employee,
                                title: employee
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
