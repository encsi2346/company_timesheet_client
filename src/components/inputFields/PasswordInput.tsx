import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import TextFieldElement, { TextFieldInputProps } from './TextFieldInput.tsx';

export type PasswordInputProps<T extends FieldValues> = TextFieldInputProps<T>;

export default function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>): JSX.Element {
    const [password, setPassword] = useState<boolean>(true);
    return (
        <TextFieldElement
            {...props}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                            onClick={() => setPassword(!password)}
                            tabIndex={-1}
                        >
                            {password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            type={password ? 'password' : 'text'}
        />
    );
}
