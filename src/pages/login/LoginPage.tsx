import {Box, TextField, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import PasswordInput from "../../components/inputFields/PasswordInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "./schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";

const LoginPage = () => {
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
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <BackgroundCard>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: '#29005C', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>WELCOME HERE AGAIN</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3}}>
                    <TextFieldInput
                        placeholder={'Email'}
                        control={control}
                        name='email'
                        type='email'
                    />
                    <PasswordInput
                        placeholder={'Password'}
                        control={control}
                        name='password'
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <SaveButton text={'login'} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default LoginPage;