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
import {parseDatePickerDate} from "../../components/inputFields/utils/parse-datepicker-date.ts";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import {useState} from "react";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {CreateEmployeeCommand, EmployeesClient} from "../../api-client.ts";
import {BackendUrl} from "../../App.tsx";
import {userEditFormSchema, UserEditFormSchema} from "./schemas/user-edit-form-schema.ts";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const {
        control,
        setValue,
        handleSubmit,
        formState: { isValid },
    } = useForm<UserEditFormSchema>({
        defaultValues: {
            email: '',
            priviligeLevel: 2,
            givenName: '',
            familyName: '',
            birthPlace: '',
            birthDate: '',
            phoneNumber: '',
            address: '',
            hireDate: '',
            terminationDate: '',
            jobTitle: '',
            hourlyWage: '', //TODO: missing other field from backend: seniority, grossHourlyWage, grossValueForProjects,
            //TODO: missing other field from backend: directManager, netHourlyWage, netValueForProjects
            contractType: '',
            expectedMonthlyHours: 40, //TODO: missing from frontend
        },
        resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    const createUser = (data) => {
        const employeesClient = new EmployeesClient(BackendUrl);
        return employeesClient.createEmployee( new CreateEmployeeCommand(data))
            .then(response => {
            });
    };

    const onSubmit = handleSubmit((data) => {
        let submitData = data as any;

        if (isEditing) {
            //TODO: update
            setInputDisabled(true);
        } else {
            //TODO: create
            createUser(submitData);
            setInputDisabled(true);
        }
    });

    const handleEditClicked = () => {
        setInputDisabled(!inputDisabled);
    };

    const positionOptions={
        softwareDeveloper: 'Szoftverfejlesztő',
        projectManager: 'Project Manager',
        softwareTester: 'Szoftvertesztelő'
    };

    const seniorityOptions={
        junior: 'Junior',
        medior: 'Medior',
        senior: 'Senior'
    };

    const userRoleOptions={
        0: 'Administrator',
        1: 'Manager',
        2: 'Employee'
    };

    const contractOptions={
        0: '0',
        1: '1',
        2: '2'
    };

    const directManagerOptions={
        managerA: 'Példa Kata',
        managerB: 'Példa Éva',
        managerC: 'Példa Zoltán'
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.FULL_NAME')}/>
            {!inputDisabled && (
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
                                        parseDate={parseDatePickerDate}
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
                                        name='priviligeLevel'
                                        data-testid='user-role-input'
                                        disabled={inputDisabled}
                                        options={Object.values(userRoleOptions).map((role) => ({
                                            id: role,
                                            title: role
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('priviligeLevel', undefined)} edge="end" >
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
                                        parseDate={parseDatePickerDate}
                                        data-testid='date-of-registration'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.SENIORITY')} />
                                    <SelectInput
                                        label={t('TEXT.SENIORITY')}
                                        control={control}
                                        name='seniority'
                                        data-testid='seniority-input'
                                        disabled={inputDisabled}
                                        options={Object.values(seniorityOptions).map((seniority) => ({
                                            id: seniority,
                                            title: seniority
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('seniority', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.GROSS_HOURLY_WAGE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.GROSS_HOURLY_WAGE')}
                                        control={control}
                                        name='grossHourlyWage'
                                        type='text'
                                        data-testid='gross-hourly-wage-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.GROSS_VALUE_FOR_PROJECTS')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.GROSS_VALUE_FOR_PROJECTS')}
                                        control={control}
                                        name='grossValueForProjects'
                                        type='text'
                                        data-testid='gross-value-for-project-input'
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
                                        options={Object.values(contractOptions).map((type) => ({
                                            id: type,
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
                                    <NormalText text={t('TEXT.DIRECT_MANAGER')} />
                                    <SelectInput
                                        label={t('TEXT.DIRECT_MANAGER')}
                                        control={control}
                                        name='directManager'
                                        data-testid='direct-manager-input'
                                        disabled={inputDisabled}
                                        options={Object.values(directManagerOptions).map((directManager) => ({
                                            id: directManager,
                                            title: directManager
                                        }))}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton onClick={() => setValue('directManager', undefined)} edge="end" >
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
                                    <NormalText text={t('TEXT.DATE_OF_TERMINATE')} />
                                    <DatePickerInput
                                        label={t('TEXT.DATE_OF_TERMINATE')}
                                        control={control}
                                        name='terminationDate'
                                        parseDate={parseDatePickerDate}
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
                                        options={Object.values(positionOptions).map((position) => ({
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
                                    <NormalText text={t('TEXT.NET_HOURLY_WAGE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.NET_HOURLY_WAGE')}
                                        control={control}
                                        name='netHourlyWage'
                                        type='text'
                                        data-testid='net-hourly-wage-input'
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.NET_VALUE_FOR_PROJECT')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.NET_VALUE_FOR_PROJECT')}
                                        control={control}
                                        name='netValueForProjects'
                                        type='text'
                                        data-testid='net-value-for-project-input'
                                        disabled={inputDisabled}
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
                    <UserProjectTableQuery />
                </Box>

                {!inputDisabled && (
                    <Box sx={{ display: 'inline', paddingLeft: 120}}>
                        <CancelButton text={t('TEXT.CANCEL')} />
                        <SaveButton text={t('TEXT.SAVE')} disabled={!isValid} onClick={onSubmit} />
                    </Box>
                )}
            </ContentCard>
        </Box>
    );
};

export default UserEdit;