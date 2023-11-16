import type {TextFieldProps} from '@mui/material';
import {TextField} from '@mui/material';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import {useSelector} from "react-redux";
import {useEffect} from "react";

export type TextFieldInputProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
    validation?: ControllerProps['rules'];
    name: Path<T>;
    parseError?: (error: FieldError) => string;
    control: Control<T>;
    showErrorMessage?: boolean;
    externalError?: boolean;
};

export default function TextFieldInput<T extends FieldValues>({
    validation = {},
    parseError,
    type,
    required,
    name,
    control,
    showErrorMessage = true,
    externalError = false,
    ...rest
}: TextFieldInputProps<T>): JSX.Element {
    const isAuth = true /*Boolean(useSelector((state) => state.token))*/; //TODO

    if (required) {
        validation.required = 'REQUIRED';
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <TextField
                    {...rest}
                    name={name}
                    value={value ?? ''}
                    variant="filled"
                    onChange={(event) => {
                        let value: string | number | undefined = event.target.value;
                        if (type === 'number') {
                            value = value ? Number(value) : undefined;
                        }
                        onChange(value);
                    }}
                    onBlur={onBlur}
                    required={required}
                    type={type}
                    error={!!error || externalError}
                    sx={{ backgroundColor: isAuth ? 'rgba(41, 0, 92, 0.12)' : 'rgba(41, 0, 92, 0.84)', borderRadius: '13px', color: '#ffffff', textDecoration: 'none', height: 40, width: 300 }}
                    inputProps={{
                        sx: {
                            color: '#ffffff',
                            padding: '9px',
                            paddingLeft: '20px',
                            fontSize: '15px',
                        },
                    }}
                    InputProps={{
                        disableUnderline: true
                    }}
                    helperText={
                        showErrorMessage
                            ? error
                                ? typeof parseError === 'function'
                                    ? parseError(error)
                                    : error.message
                                : rest.helperText
                            : null
                    }
                    onWheel={(e) => {
                        (e.target as HTMLInputElement).blur();
                    }}
                />
            )}
        />
    );
}
