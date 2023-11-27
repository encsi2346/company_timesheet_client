import PageHeader from "../../components/text/PageHeader.tsx";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import MediumText from "../../components/text/MediumText.tsx";
import SectionCard from "../../components/layout/SectionCard.tsx";
import CardText from "../../components/text/CardText.tsx";
import PersonIcon from "@mui/icons-material/Person";
import UserProjectTableQuery from "./UserProjectTableQuery.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import {useEffect, useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {
    CreateEmployeeCommand,
    EmployeesClient,
    UpdateEmployeeCommand,
} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {userEditFormSchema, UserEditFormSchema} from "./schemas/user-edit-form-schema.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuthentication();
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [positions, setPositions] = useState({
        softwareDeveloper: 'Szoftverfejlesztő',
        projectManager: 'Project Manager',
        softwareTester: 'Szoftvertesztelő'
    });
    const [userRoles, setUserRoles] = useState({
        0: 'Administrator',
        1: 'Manager',
        2: 'Employee'
    });
    const [contracts, setContracts] = useState({
        0: 'FullTime',
        1: 'HalfTime',
        2: 'PartTime1DayPerWeek',
        3: 'PartTime2DaysPerWeek',
        4: 'PartTime3DaysPerWeek',
        5: 'PartTime4DaysPerWeek',
        6: 'Flexible',
    });

    const {
        control,
        setValue,
        reset,
        getValue,
        handleSubmit,
        formState: { isValid },
    } = useForm<UserEditFormSchema>({
        defaultValues: {
            email: '',
            privilegeLevel: 2,
            givenName: '',
            familyName: '',
            birthPlace: '',
            phoneNumber: '',
            address: '',
            jobTitle: '',
            hourlyWage: 0,
            contractType: 1,
            expectedMonthlyHours: 40,
        },
        resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createUser = (data) => {
        const employeesClient = new EmployeesClient(BackendUrl, auth.http);
        return employeesClient.createEmployee( new CreateEmployeeCommand(data))
            .then(response => {
                navigate(`/users`); // todo open in view mode
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateUser = (id, data) => {
        const employeesClient = new EmployeesClient(BackendUrl, auth.http);
        return employeesClient.employeesPUT(id, new UpdateEmployeeCommand(data))
            .then(response => {
                navigate(`/users`); // todo open in view mode
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (id) {
            const employeesClient = new EmployeesClient(BackendUrl, auth.http);
            employeesClient.employeesGET(parseInt(id))
                .then(response => {
                    reset(response);
                })
        }
    }, [id, reset]);

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            updateUser(id, submitData);
            setInputDisabled(true);
        } else {
            createUser(submitData);
            setInputDisabled(true);
        }
    });

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.FULL_NAME')}/>
            {inputDisabled && (
                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <SaveButton text={t('TEXT.EDIT')} onClick={handleEditClicked} />
                </Box>
            )}
            <ContentCard>
                <Grid sx={{ flexGrow: 1 }}>
                    <SectionCard>
                        <CardText text={t('TEXT.PERSONAL_DATA')} />
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.FIRST_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.FIRST_NAME')}
                                        control={control}
                                        name='givenName'
                                        type='text'
                                        data-testid='first-name-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.FAMILY_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.FAMILY_NAME')}
                                        control={control}
                                        name='familyName'
                                        type='text'
                                        data-testid='family-name-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.BIRTH_DATE')} />
                                    <DatePickerInput
                                        label={t('TEXT.BIRTH_DATE')}
                                        control={control}
                                        name='birthDate'
                                        data-testid='birth-date'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.BIRTH_PLACE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.BIRTH_PLACE')}
                                        control={control}
                                        name='birthPlace'
                                        type='text'
                                        data-testid='birth-place-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={6} sx={{display: 'flex', justifyContent: 'end', alignItems: 'start'}}>
                                <Box sx={{ backgroundColor: '#29005C', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200}}>
                                    <PersonIcon sx={{ color: '#ffffff', height: 150, width: 150}} />
                                </Box>
                            </Grid>
                        </Grid>
                    </SectionCard>
                    <SectionCard>
                       <CardText text={t('TEXT.CONTACT_INFORMATION')} />
                       <Grid container spacing={8}>
                           <Grid item xs={4} md={6}>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={t('TEXT.EMAIL')} />
                                   <TextFieldInput
                                       placeholder={t('TEXT.EMAIL')}
                                       control={control}
                                       name='email'
                                       type='email'
                                       data-testid='email-input'
                                       disabled={inputDisabled}
                                   />
                               </Box>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={t('TEXT.ADDRESS')} />
                                   <TextFieldInput
                                       placeholder={t('TEXT.ADDRESS')}
                                       control={control}
                                       name='address'
                                       type='text'
                                       data-testid='address-input'
                                       disabled={inputDisabled}
                                   />
                               </Box>
                           </Grid>
                           <Grid item xs={4} md={6}>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={t('TEXT.PHONE')} />
                                   <TextFieldInput
                                       placeholder={t('TEXT.PHONE')}
                                       control={control}
                                       name='phoneNumber'
                                       type='text'
                                       data-testid='phone-input'
                                       disabled={inputDisabled}
                                   />
                               </Box>
                           </Grid>
                       </Grid>
                   </SectionCard>
                    <SectionCard>
                        <CardText text={t('TEXT.POSITION_INFORMATION')} />
                        <Grid container spacing={8}>
                            <Grid item xs={4} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.USER_ROLE')} />
                                    <SelectInput
                                        label={t('TEXT.USER_ROLE')}
                                        control={control}
                                        name='privilegeLevel'
                                        data-testid='user-role-input'
                                        disabled={inputDisabled}
                                        options={Object.entries(userRoles).map(([id, role]) => ({
                                            id: parseInt(id,10),
                                            title: role
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('privilegeLevel', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.DATE_OF_REGISTRATION')} />
                                    <DatePickerInput
                                        label={t('TEXT.DATE_OF_REGISTRATION')}
                                        control={control}
                                        name='hireDate'
                                        data-testid='date-of-registration'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.GROSS_HOURLY_WAGE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.GROSS_HOURLY_WAGE')}
                                        control={control}
                                        name='hourlyWage'
                                        type='number'
                                        data-testid='gross-hourly-wage-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.CONTRACT_TYPE')} />
                                    <SelectInput
                                        label={t('TEXT.CONTRACT_TYPE')}
                                        control={control}
                                        name='contractType'
                                        data-testid='contract-type-input'
                                        disabled={inputDisabled}
                                        options={Object.entries(contracts).map(([id, type]) => ({
                                            id: parseInt(id,10),
                                            title: type
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('contractType', undefined)} edge="end" >
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
                            </Grid>
                            <Grid item xs={4} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.DATE_OF_TERMINATE')} />
                                    <DatePickerInput
                                        label={t('TEXT.DATE_OF_TERMINATE')}
                                        control={control}
                                        name='terminationDate'
                                        data-testid='date-of-termination'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.POSITION')} />
                                    <SelectInput
                                        label={t('TEXT.POSITION')}
                                        control={control}
                                        name='jobTitle'
                                        data-testid='position-input'
                                        disabled={inputDisabled}
                                        options={Object.values(positions).map((position) => ({
                                            id: position,
                                            title: position
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('jobTitle', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.EXPECTED_MONTHLY_HOURS')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.EXPECTED_MONTHLY_HOURS')}
                                        control={control}
                                        name='expectedMonthlyHours'
                                        type='text'
                                        data-testid='expected-monthly-hours-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </SectionCard>
                </Grid>

                <MediumText text={t('TEXT.CURRENT_PROJECT')} />

                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10}}>
                    <UserProjectTableQuery
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                        employeeId={id ?? 0}
                    />
                </Box>

                {!inputDisabled && (
                    <Box sx={{ display: 'inline', paddingLeft: 120}}>
                        <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                        <SaveButton text={t('TEXT.SAVE')} onClick={onSubmit} /*disabled={!isValid}*//>
                    </Box>
                )}
            </ContentCard>
        </Box>
    );
};

export default UserEdit;