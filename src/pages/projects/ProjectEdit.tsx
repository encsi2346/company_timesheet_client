import PageHeader from "../../components/text/PageHeader.tsx";
import {Box, Grid, TextField} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import MediumText from "../../components/text/MediumText.tsx";
import AddButton from "../../components/button/AddButton.tsx";
import ProjectTable from "./ProjectTable.tsx";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const ProjectEdit = ({ isEditing = false, isInputDisabled }: Props) => {

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
            <PageHeader text={'Project Name'}/>
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Type'} />
                        <TextFieldInput
                            label={'Type'}
                            control={control}
                            name='type'
                            type='text'
                        />
                        <NormalText text={'Status'} />
                        <TextFieldInput
                            label={'Status'}
                            control={control}
                            name='Status'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Partner'} />
                        <TextFieldInput
                            label={'partner'}
                            control={control}
                            name='partner'
                            type='text'
                        />
                        <NormalText text={'Project Manager'} />
                        <TextFieldInput
                            label={'project manager'}
                            control={control}
                            name='projectManager'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Estimated start date'} />
                        <TextFieldInput
                            label={'estimated start date'}
                            control={control}
                            name='estimatedStartDate'
                            type='text'
                        />
                        <NormalText text={'Estimated end date'} />
                        <TextFieldInput
                            label={'estimated end date'}
                            control={control}
                            name='estimatedEndDate'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Estimated hours'} />
                        <TextFieldInput
                            label={'estimated hours'}
                            control={control}
                            name='estimatedHours'
                            type='text'
                        />
                        <NormalText text={'Real hours'} />
                        <TextFieldInput
                            label={'real hours'}
                            control={control}
                            name='realHours'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Start date'} />
                        <TextFieldInput
                            label={'start date'}
                            control={control}
                            name='startDate'
                            type='text'
                        />
                        <NormalText text={'End date'} />
                        <TextFieldInput
                            label={'end date'}
                            control={control}
                            name='endDate'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <NormalText text={'Estimated value'} />
                        <TextFieldInput
                            label={'estimated value'}
                            control={control}
                            name='estimatedValue'
                            type='text'
                        />
                        <NormalText text={'Real value'} />
                        <TextFieldInput
                            label={'real value'}
                            control={control}
                            name='realValue'
                            type='text'
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex'}}>
                    <MediumText text={'Peoples on the project'} />
                    <AddButton text={'Add employee'}/>
                </Box>

                <Box sx={{ display: 'flex', marginTop: 5, marginBottom: 10}}>
                    <ProjectTable />
                </Box>

                <Box sx={{ display: 'inline', paddingLeft: 130}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectEdit;