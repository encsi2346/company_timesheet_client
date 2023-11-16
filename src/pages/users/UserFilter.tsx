import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, IconButton, InputAdornment} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useEffect, useState} from "react";
import SelectOption from "../../components/inputFields/utils/SelectOption.tsx";
import useQueryParam from "../../components/inputFields/hooks/useQueryParam.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

interface Props {
    enableQueryParams?: boolean;
    onFiltersChanged: (filters: string[]) => void;
}

const UserFilter = ({ enableQueryParams = true, onFiltersChanged }: Props) => {
    const { t } = useTypeSafeTranslation();
    const [tasks, setTasks] = useState<SelectOption[]>([]);
    const [languages, setLanguages] = useState<SelectOption[]>([]);

    const [filters, setFilters] = useQueryParam('filters');

    const {
        reset,
        trigger,
        watch,
        control,
        handleSubmit,
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

    const onSubmit = handleSubmit((data) => {
        if (enableQueryParams) {
            setFilters(data, { replace: true });
        }

        onFiltersChanged(data);
    });

    useEffect(() => {
        if (filters) {
            reset(filters, { keepDefaultValues: true });
        }

        onSubmit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onReset = () => {
        reset();
        onSubmit();
    };

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

    const projectOptions={
        projectA: 'A Projekt',
        projectB: 'B Projekt',
        projectC: 'C Projekt'
    };

    return (
        <ContentCard>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3}}>
                    <TextFieldInput
                        placeholder={t('BUTTON.FULLNAME')}
                        control={control}
                        name={t('fullName')}
                        type='text'
                    />
                    <SelectInput
                        label={'Szint'}
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
                    <SelectInput
                        label={'Pozíció'}
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
                    <SelectInput
                        label={'Jelenlegi projekt'}
                        control={control}
                        name='currentProject'
                        options={Object.values(projectOptions).map((projectType) => ({
                            id: projectType,
                            title: projectType
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
            </Box>

            <Box sx={{ display: 'inline', marginLeft: -2.5}}>
                <CancelButton text={'Szűrők törlése'} />
                <SaveButton text={'Szűrés'} />
            </Box>
        </ContentCard>
    );
};

export default UserFilter;