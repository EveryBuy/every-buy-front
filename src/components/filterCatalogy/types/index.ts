import React from 'react';
import { Option } from '@components/shared/types'


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

