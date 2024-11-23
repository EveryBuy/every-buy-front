import React from 'react';
import { Option } from '@/types/filterOption'
import { SelectChangeEvent } from '@mui/material';


export interface FilterConfig {
    label: string;
    value: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
    options: Option[];
}

export interface SliderProps {
    price: number[];
    setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    options: Option[];
}