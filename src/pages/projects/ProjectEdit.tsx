import PageHeader from "../../components/text/PageHeader.tsx";
import type {SxProps, Theme} from "@mui/material";
import {Box, Button, Grid, IconButton, InputAdornment} from "@mui/material";
import NormalText from "../../components/text/NormalText.tsx";
import CancelButton from "../../components/button/CancelButton.tsx";
import SaveButton from "../../components/button/SaveButton.tsx";
import ContentCard from "../../components/layout/ContentCard.tsx";
import TextFieldInput from "../../components/inputFields/TextFieldInput.tsx";
import {useForm} from "react-hook-form";
import {loginFormSchema, LoginFormSchema} from "../login/schemas/login-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import MediumText from "../../components/text/MediumText.tsx";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import useSelection from "../../components/inputFields/hooks/useSelection.tsx";
import omitEmptyValues from "../../components/inputFields/utils/omit-empty-values.tsx";
import ProjectUsersTableQuery from "./ProjectUsersTableQuery.tsx";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SelectInput from "../../components/inputFields/SelectInput.tsx";
import DatePickerInput from "../../components/inputFields/DatePickerInput.tsx";
import {parseDatePickerDate} from "../../components/inputFields/utils/parse-datepicker-date.ts";

const addButtonStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#29005C',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '80px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const ProjectEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const location = useLocation();
    const [filters, setFilters] = useState({});
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const actualFilters = omitEmptyValues(filters);

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

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

    const typeOptions={
        inner: 'külsős',
        outer: 'belsős'
    };

    const statusOptions={
        inPlanning: 'Tervezés alatt',
        underCoding: 'Fejlesztés alatt',
        completed: 'Kész'
    };

    return (
        <Box sx={{ display: 'block', width: 1300}}>
            <PageHeader text={'Projekt neve'}/>
            <ContentCard>
                <Grid sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5}>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Típus'} />
                                <SelectInput
                                    label={'Típus'}
                                    control={control}
                                    name='type'
                                    options={Object.values(typeOptions).map((projectType) => ({
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Partner'} />
                                <TextFieldInput
                                    label={'partner'}
                                    control={control}
                                    name='partner'
                                    type='text'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Estimated start date'} />
                                <DatePickerInput
                                    label={'estimated start date'}
                                    control={control}
                                    name='estimatedStartDate'
                                    parseDate={parseDatePickerDate}
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Estimated hours'} />
                                <TextFieldInput
                                    label={'estimated hours'}
                                    control={control}
                                    name='estimatedHours'
                                    type='text'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Start date'} />
                                <DatePickerInput
                                    label={'start date'}
                                    control={control}
                                    name='startDate'
                                    parseDate={parseDatePickerDate}
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Estimated value'} />
                                <TextFieldInput
                                    label={'estimated value'}
                                    control={control}
                                    name='estimatedValue'
                                    type='text'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={5}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Status'} />
                                <SelectInput
                                    label={'Állapot'}
                                    control={control}
                                    name='status'
                                    options={Object.values(statusOptions).map((projectStatus) => ({
                                        id: projectStatus,
                                        title: projectStatus
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Project Manager'} />
                                <TextFieldInput
                                    label={'project manager'}
                                    control={control}
                                    name='projectManager'
                                    type='text'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Estimated end date'} />
                                <DatePickerInput
                                    label={'estimated end date'}
                                    control={control}
                                    name='estimatedEndDate'
                                    parseDate={parseDatePickerDate}
                                    disabled={inputDisabled}
                                 />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Real hours'} />
                                <TextFieldInput
                                    label={'real hours'}
                                    control={control}
                                    name='realHours'
                                    type='text'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'End date'} />
                                <DatePickerInput
                                    label={'end date'}
                                    control={control}
                                    name='endDate'
                                    parseDate={parseDatePickerDate}
                                    disabled={inputDisabled}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <NormalText text={'Real value'} />
                                <TextFieldInput
                                    label={'real value'}
                                    control={control}
                                    name='realValue'
                                    type='text'
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
                    <MediumText text={'Projekt résztvevői'} />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {!isEditing && (
                            <Button
                                disabled={!!selectionModel.length}
                                sx={ addButtonStyle }
                                startIcon={<AddRoundedIcon />}
                                component={Link}
                                to="new"
                                state={{ queryParams: location.search }}
                            >
                                {'Alkalmazott hozzáadása'}
                            </Button>
                        )}
                        {isEditing && (
                            <Button
                                disabled={!!selectionModel.length}
                                sx={ addButtonStyle }
                                startIcon={<AddRoundedIcon />}
                            >
                                {'Alkalmazott hozzáadása'}
                            </Button>
                        )}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', marginTop: 7, marginBottom: 10}}>
                    <ProjectUsersTableQuery />
                </Box>

                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                    <CancelButton text={'Mégsem'} />
                    <SaveButton text={'Mentés'} />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default ProjectEdit;