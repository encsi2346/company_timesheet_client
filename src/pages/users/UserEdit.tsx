import PageHeader from "../../components/text/PageHeader.tsx";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
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
        formState: { isValid },
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
        mode: 'all',
    });

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

    const directManagerOptions={
        managerA: 'Példa Kata',
        managerB: 'Példa Éva',
        managerC: 'Példa Zoltán'
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={t('TEXT.FULL_NAME')}/>
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
                                        name='firstName'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.FAMILY_NAME')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.FAMILY_NAME')}
                                        control={control}
                                        name='familyName'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.BIRTH_DATE')} />
                                    <DatePickerInput
                                        label={t('TEXT.BIRTH_DATE')}
                                        control={control}
                                        name='birthDate'
                                        parseDate={parseDatePickerDate}
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
                                   />
                               </Box>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={t('TEXT.ADDRESS')} />
                                   <TextFieldInput
                                       placeholder={t('TEXT.ADDRESS')}
                                       control={control}
                                       name='address'
                                       type='text'
                                   />
                               </Box>
                           </Grid>
                           <Grid item xs={4} md={6}>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={t('TEXT.PHONE')} />
                                   <TextFieldInput
                                       placeholder={t('TEXT.PHONE')}
                                       control={control}
                                       name='phone'
                                       type='text'
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
                                    <NormalText text={t('TEXT.DATE_OF_REGISTRATION')} />
                                    <DatePickerInput
                                        label={t('TEXT.DATE_OF_REGISTRATION')}
                                        control={control}
                                        name='dateOfRegistration'
                                        parseDate={parseDatePickerDate}
                                        disabled={inputDisabled}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.SENIORITY')} />
                                    <SelectInput
                                        label={t('TEXT.SENIORITY')}
                                        control={control}
                                        name='seniority'
                                        options={Object.values(seniorityOptions).map((seniority) => ({
                                            id: seniority,
                                            title: seniority
                                        }))}
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
                                    <NormalText text={t('TEXT.GROSS_HOURLY_WAGE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.GROSS_HOURLY_WAGE')}
                                        control={control}
                                        name='grossHourlyWage'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.GROSS_VALUE_FOR_PROJECTS')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.GROSS_VALUE_FOR_PROJECTS')}
                                        control={control}
                                        name='grossValueForProjects'
                                        type='text'
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
                                        options={Object.values(directManagerOptions).map((directManager) => ({
                                            id: directManager,
                                            title: directManager
                                        }))}
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
                                    <NormalText text={t('TEXT.POSITION')} />
                                    <SelectInput
                                        label={t('TEXT.POSITION')}
                                        control={control}
                                        name='position'
                                        options={Object.values(positionOptions).map((position) => ({
                                            id: position,
                                            title: position
                                        }))}
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
                                    <NormalText text={t('TEXT.NET_HOURLY_WAGE')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.NET_HOURLY_WAGE')}
                                        control={control}
                                        name='netHourlyWage'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={t('TEXT.NET_VALUE_FOR_PROJECT')} />
                                    <TextFieldInput
                                        placeholder={t('TEXT.NET_VALUE_FOR_PROJECT')}
                                        control={control}
                                        name='netValueForProjects'
                                        type='text'
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

                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <CancelButton text={t('TEXT.CANCEL')} />
                    <SaveButton text={t('TEXT.SAVE')} />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default UserEdit;