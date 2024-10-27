import { SelectChangeEvent } from "@mui/material";

export interface Option {
    value: string;
    label: string;
}

export interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    options: Option[];
}