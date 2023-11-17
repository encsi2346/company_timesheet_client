import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box} from "@mui/material";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import {useEffect} from "react";
import useQueryParam from "../../components/inputFields/hooks/useQueryParam.tsx";
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";

interface Props {
    enableQueryParams?: boolean;
    onFiltersChanged: (filters: string[]) => void;
}

const EmployeesPlannerFilter = ({ enableQueryParams = true, onFiltersChanged }: Props) => {
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
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Box sx={{ display: 'inline', alignItems: 'center', justifyContent: 'center'}}>
                    <TextFieldInput
                        placeholder={t('TEXT.TYPE')}
                        control={control}
                        name='type'
                        type='text'
                    />

                    <CancelButton text={t('TEXT.SEND_NOTIFICATION')} />
                    <SaveButton text={t('TEXT.OPENING_MONTH')} />
                    <SaveButton text={t('TEXT.CLOSING_MONTH')} />
                </Box>
            </Box>
        </ContentCard>
    );
};

export default EmployeesPlannerFilter;