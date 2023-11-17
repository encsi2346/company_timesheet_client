import {Box, TextField, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import PasswordInput from "../../components/inputFields/PasswordInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "./schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

const LoginPage = () => {
    const { t } = useTypeSafeTranslation();
    const {
        control,
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
                    <Typography sx={{color: '#29005C', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>{t('TEXT.WELCOME')}</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3}}>
                    <TextFieldInput
                        placeholder={t('TEXT.EMAIL')}
                        control={control}
                        name='email'
                        type='email'
                    />
                    <PasswordInput
                        placeholder={t('TEXT.PASSWORD')}
                        control={control}
                        name='password'
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <SaveButton text={t('TEXT.LOGIN')} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default LoginPage;