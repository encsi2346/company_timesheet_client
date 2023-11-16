import PageHeader from "../../components/text/PageHeader.tsx";
import {Box, Grid} from "@mui/material";
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

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const UserEdit = ({ isEditing = false, isInputDisabled }: Props) => {

    const {
        reset,
        trigger,
        watch,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
        mode: 'all',
    });

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={'Employees Name'}/>
            <ContentCard>
                <Grid sx={{ flexGrow: 1 }}>
                    <SectionCard>
                        <CardText text={'Personal Data'} />
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={5}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'First Name'} />
                                    <TextFieldInput
                                        label={'First Name'}
                                        control={control}
                                        name='firstName'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Family Name'} />
                                    <TextFieldInput
                                        label={'Family Name'}
                                        control={control}
                                        name='familyName'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Birth Date'} />
                                    <TextFieldInput
                                        label={'Birth Date'}
                                        control={control}
                                        name='birthDate'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Birth Place'} />
                                    <TextFieldInput
                                        label={'Birth Place'}
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
                       <CardText text={'Contact information'} />
                       <Grid container spacing={8}>
                           <Grid item xs={4} md={6}>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={'Email'} />
                                   <TextFieldInput
                                       label={'Email'}
                                       control={control}
                                       name='email'
                                       type='email'
                                   />
                               </Box>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={'Address'} />
                                   <TextFieldInput
                                       label={'Address'}
                                       control={control}
                                       name='address'
                                       type='text'
                                   />
                               </Box>
                           </Grid>
                           <Grid item xs={4} md={6}>
                               <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                   <NormalText text={'Phone'} />
                                   <TextFieldInput
                                       label={'Phone'}
                                       control={control}
                                       name='phone'
                                       type='text'
                                   />
                               </Box>
                           </Grid>
                       </Grid>
                   </SectionCard>
                    <SectionCard>
                        <CardText text={'Position information'} />
                        <Grid container spacing={8}>
                            <Grid item xs={4} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Date of Registration'} />
                                    <TextFieldInput
                                        label={'Date of Registration'}
                                        control={control}
                                        name='dateOfRegistration'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Seniority'} />
                                    <TextFieldInput
                                        label={'Seniority'}
                                        control={control}
                                        name='seniority'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Gross hourly wage'} />
                                    <TextFieldInput
                                        label={'Gross hourly wage'}
                                        control={control}
                                        name='grossHourlyWage'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Gross Value For Projects'} />
                                    <TextFieldInput
                                        label={'Gross Value For Projects'}
                                        control={control}
                                        name='grossValueForProjects'
                                        type='text'
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Direct Manager'} />
                                    <TextFieldInput
                                        label={'Direct Manager'}
                                        control={control}
                                        name='directManager'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Position'} />
                                    <TextFieldInput
                                        label={'Position'}
                                        control={control}
                                        name='position'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Net hourly wage'} />
                                    <TextFieldInput
                                        label={'Net hourly wage'}
                                        control={control}
                                        name='netHourlyWage'
                                        type='text'
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <NormalText text={'Net Value For Projects'} />
                                    <TextFieldInput
                                        label={'Net Value For Projects'}
                                        control={control}
                                        name='netValueForProjects'
                                        type='text'
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </SectionCard>
                </Grid>

                <MediumText text={'Current Projects'} />

                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10}}>
                    <UserProjectTableQuery />
                </Box>

                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default UserEdit;