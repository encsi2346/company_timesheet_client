import { TextField } from '@mui/material';
import { useContext } from 'react';
import {DatePickerContext} from "./context/DatePickerContext.tsx";

const DatePickerTextField = (params: any) => {
    const { inputProps, testId, onBlur, required, error, helperText } = useContext(DatePickerContext);

    return (
        <TextField
            {...params}
            {...inputProps}
            fullWidth
            data-testid={testId}
            onBlur={onBlur}
            required={!!required}
            error={error}
            helperText={helperText}
        />
    );
};

export default DatePickerTextField;
