import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useEffect} from "react";
import useQueryParam from "../../components/inputFields/hooks/useQueryParam.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

interface Props {
    enableQueryParams?: boolean;
    onFiltersChanged: (filters: string[]) => void;
}

const LogsFilter = ({ enableQueryParams = true, onFiltersChanged }: Props) => {
    const { t } = useTypeSafeTranslation();
    const [filters, setFilters] = useQueryParam('filters');

    const {
        reset,
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
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3}}>
                    <TextFieldInput
                        placeholder={t('TEXT.FULL_NAME')}
                        control={control}
                        name='employee'
                        type='text'
                        data-testid='full-name-search'
                    />
                    <TextFieldInput
                        placeholder={t('TEXT.PROJECT')}
                        control={control}
                        name='project'
                        type='text'
                        data-testid='project-name-search'
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'inline', marginLeft: -2.5}}>
                <CancelButton text={t('TEXT.REMOVE_FILTERS')} />
                <SaveButton text={t('TEXT.FILTER')} />
            </Box>
        </ContentCard>
    );
};

export default LogsFilter;