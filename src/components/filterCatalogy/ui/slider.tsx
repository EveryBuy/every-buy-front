import React from 'react';
import {
    Grid2,
    Typography,
    Slider as MuiSlider,
    Box,
    TextField,
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import { SliderProps } from '../types';

const BootstrapInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: 4,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '6px 12px',
    },
}));

function valuetext(value: number) {
    return `${value} грн`;
}

export function Slider({ price, setPrice }: SliderProps) {
    const handleChangePrice = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography>Ціна</Typography>
            <MuiSlider
                value={price}
                onChange={handleChangePrice}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
                min={0}
                max={100000}
                sx={{ color: 'black' }}
            />
            <Box display='flex' gap={1}>
                <BootstrapInput
                    variant='outlined'
                    size='small'
                    value={price[0]}
                    onChange={(e) => setPrice([+e.target.value, price[1]])}
                    label='Мін'
                />
                <BootstrapInput
                    variant='outlined'
                    size='small'
                    value={price[1]}
                    onChange={(e) => setPrice([price[0], +e.target.value])}
                    label='Макс'
                />
            </Box>
        </Grid2>
    );
}
