import PageHeader from "../../components/text/PageHeader.tsx";
import {Box, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import MediumText from "../../components/text/MediumText.tsx";
import ProjectTable from "../projects/ProjectTable.tsx";
import SectionCard from "../../components/layout/SectionCard.tsx";

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
        <Box>
            <PageHeader text={'Employees Name'}/>
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <SectionCard>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            <MediumText text={'Personal Data'} />
                            <NormalText text={'First Name'} />
                            <TextFieldInput
                                label={'First Name'}
                                control={control}
                                name='firstName'
                                type='text'
                            />
                            <NormalText text={'Family Name'} />
                            <TextFieldInput
                                label={'Family Name'}
                                control={control}
                                name='familyName'
                                type='text'
                            />
                            <NormalText text={'Birth Date'} />
                            <TextFieldInput
                                label={'Birth Date'}
                                control={control}
                                name='birthDate'
                                type='text'
                            />
                            <NormalText text={'Birth Place'} />
                            <TextFieldInput
                                label={'Birth Place'}
                                control={control}
                                name='birthPlace'
                                type='text'
                            />
                        </Box>
                    </SectionCard>
                   <SectionCard>
                       <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                           <MediumText text={'Contact information'} />
                           <NormalText text={'Email'} />
                           <TextFieldInput
                               label={'Email'}
                               control={control}
                               name='email'
                               type='email'
                           />
                           <NormalText text={'Phone'} />
                           <TextFieldInput
                               label={'Phone'}
                               control={control}
                               name='phone'
                               type='text'
                           />
                           <NormalText text={'Address'} />
                           <TextFieldInput
                               label={'Address'}
                               control={control}
                               name='address'
                               type='text'
                           />
                       </Box>
                   </SectionCard>
                    <SectionCard>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                            <MediumText text={'Position information'} />
                            <NormalText text={'Date of Registration'} />
                            <TextFieldInput
                                label={'Date of Registration'}
                                control={control}
                                name='dateOfRegistration'
                                type='text'
                            />
                            <NormalText text={'Direct Manager'} />
                            <TextFieldInput
                                label={'Direct Manager'}
                                control={control}
                                name='directManager'
                                type='text'
                            />
                            <NormalText text={'Seniority'} />
                            <TextFieldInput
                                label={'Seniority'}
                                control={control}
                                name='seniority'
                                type='text'
                            />
                            <NormalText text={'Position'} />
                            <TextFieldInput
                                label={'Position'}
                                control={control}
                                name='position'
                                type='text'
                            />
                            <NormalText text={'Gross hourly wage'} />
                            <TextFieldInput
                                label={'Gross hourly wage'}
                                control={control}
                                name='grossHourlyWage'
                                type='text'
                            />
                            <NormalText text={'Net hourly wage'} />
                            <TextFieldInput
                                label={'Net hourly wage'}
                                control={control}
                                name='netHourlyWage'
                                type='text'
                            />
                            <NormalText text={'Gross Value For Projects'} />
                            <TextFieldInput
                                label={'Gross Value For Projects'}
                                control={control}
                                name='grossValueForProjects'
                                type='text'
                            />
                            <NormalText text={'Net Value For Projects'} />
                            <TextFieldInput
                                label={'Net Value For Projects'}
                                control={control}
                                name='netValueForProjects'
                                type='text'
                            />
                        </Box>
                    </SectionCard>
                </Box>

                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <MediumText text={'Current Projects'} />
                    <ProjectTable />
                </Box>

                <Box sx={{ display: 'inline', paddingLeft: 100}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default UserEdit;