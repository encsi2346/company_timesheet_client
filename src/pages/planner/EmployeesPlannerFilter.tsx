import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

const EmployeesPlannerFilter = () => {
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
                    <Box sx={{ display: 'inline'}}>
                        <CancelButton text={'Send notification'} />
                        <SaveButton text={'Reopen month'} />
                        <SaveButton text={'Close month'} />
                    </Box>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default EmployeesPlannerFilter;