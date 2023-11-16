import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useEffect, useState} from "react";
import SelectOption from "../../components/inputFields/utils/SelectOption.tsx";
import useQueryParam from "../../components/inputFields/hooks/useQueryParam.tsx";

interface Props {
    enableQueryParams?: boolean;
    onFiltersChanged: (filters: string[]) => void;
}

const EmployeesPlannerFilter = ({ enableQueryParams = true, onFiltersChanged }: Props) => {
    const [tasks, setTasks] = useState<SelectOption[]>([]);
    const [languages, setLanguages] = useState<SelectOption[]>([]);

    const [filters, setFilters] = useQueryParam('filters');

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

    return (
        <ContentCard>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{ display: 'inline', alignItems: 'center', justifyContent: 'center'}}>
                    <TextFieldInput
                        label={'Type'}
                        control={control}
                        name='type'
                        type='text'
                    />

                    <CancelButton text={'Send notification'} />
                    <SaveButton text={'Reopen month'} />
                    <SaveButton text={'Close month'} />
                </Box>
            </Box>
        </ContentCard>
    );
};

export default EmployeesPlannerFilter;