import React from 'react';
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";

const MyPlannerFilter = () => {
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
                    <Box sx={{ display: 'inline'}}>
                        <CancelButton text={'Submit month'} />
                        <SaveButton text={'Today'} />
                    </Box>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default MyPlannerFilter;