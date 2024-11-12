'use client';

import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export function CustomSeparator() {
    const breadcrumbs = [
        <Link
            underline='hover'
            key='1'
            color='inherit'
            href='/'
            onClick={handleClick}
        >
            Головна
        </Link>,
        <Typography key='2' sx={{ color: 'text.primary' }}>
            Мода та стиль
        </Typography>,
    ];

    return (
        <Stack spacing={1}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize='small' />}
                aria-label='breadcrumb'
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
