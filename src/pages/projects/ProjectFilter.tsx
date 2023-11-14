import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ContentCard from "../../components/layout/ContentCard.tsx";
import {Box} from "@mui/material";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";

const ProjectFilter = () => {

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
            <ContentCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <TextFieldInput
                            label={'Type'}
                            control={control}
                            name='type'
                            type='text'
                        />
                    </Box>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectFilter;