import {Box, TextField, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import PasswordInput from "../../components/inputFields/PasswordInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "./schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import {useState} from "react";
import {useAuthentication} from "../../auth/AuthProvider.tsx";
import {Navigate} from "react-router-dom";

const LoginPage = () => {
    const { t } = useTypeSafeTranslation();
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

    const auth = useAuthentication();

    const [loginFailed, setLoginFailed] = useState(false);

    if (auth.isAuthenticated) {
        return <Navigate to="/"/>;
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            const result = await auth.login(data.email, data.password);
        } catch (e) {
            setLoginFailed(true);
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <BackgroundCard>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: '#29005C', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>{t('TEXT.WELCOME')}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3}}>
                        {(loginFailed) ?
                            <Typography sx={{
                                color: 'red',
                                fontWeight: 'bold'
                            }}>{t('TEXT.LOGIN_FAILED')}</Typography>
                            : null
                        }
                        <TextFieldInput
                            placeholder={t('TEXT.EMAIL')}
                            control={control}
                            name='email'
                            type='email'
                            data-testid='email-input'
                        />
                        <PasswordInput
                            placeholder={t('TEXT.PASSWORD')}
                            control={control}
                            name='password'
                            data-testid='password-input'
                        />
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <SaveButton text={t('TEXT.LOGIN')} control={control} type='submit' />
                    </Box>
                </BackgroundCard>
            </Box>
        </form>
    );
};

export default LoginPage;