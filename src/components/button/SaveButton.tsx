import {Button, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";

interface Props {
    text: string;
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const SaveButton = ({ text, type, onClick, disabled }: Props) => {
    const { palette } = useTheme();

    return (
        <Button
            type={type}
            data-testid='save-button'
            sx={{
                backgroundColor: `${palette.component.darkMax}`,
                color: `${palette.textColor.light}`,
                fontWeight: 'regular',
                fontSize: '14px',
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
            }}
            onClick={() => {
                if(!disabled && onClick) {
                    onClick();
                }
            }}
        >
            {text}
        </Button>
    );
};

export default SaveButton;