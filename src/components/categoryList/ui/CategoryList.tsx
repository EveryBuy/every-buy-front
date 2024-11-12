'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const categories = [
    'Боді',
    'Майки та футболки',
    'Блузи і сорочки',
    'Светри, кардигани, худі',
    'Плаття',
    'Спідниці',
    'Верхній одяг',
    'Джинси',
    'Шорти',
    'Брюки',
    'Комбінезони',
    'Жіночі піджаки та жакети',
    'Домашній одяг та одяг для сну',
    'Спортивний одяг',
    'Інший жіночий одяг',
];

export function CategoryList() {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (category: string) => {
        setSelectedCategory((prev) => (prev === category ? '' : category));
    };

    return (
        <Box
            display='flex'
            flexWrap='wrap'
            gap={2}
            padding={2}
            borderRadius={1}
        >
            {categories.map((category, index) => (
                <Typography
                    key={index}
                    variant='body2'
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                        color:
                            selectedCategory === category ? '#000' : '#757575',
                        fontWeight:
                            selectedCategory === category ? 'bold' : 'normal',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#000',
                        },
                        transition: 'color 0.3s ease',
                    }}
                >
                    {category}
                </Typography>
            ))}
        </Box>
    );
}
