import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import useSelection from '../../components/inputFields/hooks/useSelection.tsx';
import {useTypeSafeTranslation} from "../../components/inputFields/hooks/useTypeSafeTranslation.tsx";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {parseDatePickerDate} from "../../components/inputFields/utils/parse-datepicker-date.ts";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import NormalText from "../../components/text/NormalText.tsx";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    color: '#29005C',
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    textTransform: 'uppercase'
}

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const cancelTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#29005C',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const AddPlanDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { selectionModel, handleSelectionChange } = useSelection(props.defaultSelected);

        const {
            control,
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

        const projectOptions={
            projectA: 'A Projekt',
            projectB: 'B Projekt',
            projectC: 'C Projekt'
        };

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title" sx={titleStyle}>
                    {props.title}
                </DialogTitle>

                <DialogContent sx={{ width: 500, height: 300, display: 'block', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1, marginTop: 1}}>
                        <SelectInput
                            label={t('TEXT.PROJECT')}
                            control={control}
                            name='project'
                            options={Object.values(projectOptions).map((project) => ({
                                id: project,
                                title: project
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
                        <TextFieldInput
                            placeholder={t('TEXT.DESCRIPTION')}
                            control={control}
                            name='description'
                            type='text'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
                        <NormalText text={t('TEXT.BIRTH_DATE')} />
                        <DatePickerInput
                            label={t('TEXT.BIRTH_DATE')}
                            control={control}
                            name='birthDate'
                            parseDate={parseDatePickerDate}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1}}>
                        <NormalText text={t('TEXT.WORKED_HOURS')} />
                        <TextFieldInput
                            placeholder={t('TEXT.WORKED_HOURS')}
                            control={control}
                            name={t('workedHours')}
                            type='text'
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        onClick={() => {
                            modal.reject();
                            modal.remove();
                        }}
                        data-testid="cancel-button"
                        sx={cancelTitleStyle}
                    >
                        {t('TEXT.CANCEL')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            modal.resolve(selectionModel);
                            modal.remove();
                        }}
                        data-testid="confirm-button"
                        sx={saveTitleStyle}
                    >
                        {props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

export default AddPlanDialog;
