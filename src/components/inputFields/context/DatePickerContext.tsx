import type { TextFieldProps } from '@mui/material';
import { createContext, ReactNode } from 'react';
import type { Noop } from 'react-hook-form';

interface DatePickerContextType {
    inputProps?: TextFieldProps;
    testId: string;
    onBlur: Noop;
    required: boolean;
    error: boolean;
    helperText?: ReactNode | string | number | null;
}

export const DatePickerContext = createContext<DatePickerContextType>(undefined!);
