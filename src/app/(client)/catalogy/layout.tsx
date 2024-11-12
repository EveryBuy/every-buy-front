'use client';

import React from 'react';
import LayoutProps from '@/types/layoutProp';
import { Container, Box, Typography } from '@mui/material';
import {
    CustomSeparator,
    FilterCatalogySearch,
    CategoryList,
} from '@/components';

const styles = {
    display: 'flex',
    flexDirection: 'column',
};

const CatalogyLayout = ({ children }: LayoutProps) => {
    return (
        <Container sx={{ marginTop: '1rem' }}>
            <Box className='custom-separator' maxWidth={'sm'}>
                <CustomSeparator />
            </Box>
            <Box sx={styles}>
                <Typography variant='h3' sx={{ margin: '2.5rem 0' }}>
                    Фільтри
                </Typography>
                <FilterCatalogySearch />
                <CategoryList />
            </Box>
            <Typography variant='h3' sx={{ margin: '1rem 0' }}>
                Ми знайшли понад 1000 оголошень
            </Typography>
            {children}
        </Container>
    );
};

export default CatalogyLayout;
