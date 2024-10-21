import React from 'react';
import { CircularProgress, SxProps } from '@mui/material';
import styles from './CommonPreloader.module.scss';

interface CommonPreloaderProps {
    size?: number;
    color?: string;
    sx?: SxProps;
}
const CommonPreloader: React.FC<CommonPreloaderProps> = ({ size = 40, sx }) => {
    return (
        <div className={styles.preloaderContainer}>
            <CircularProgress size={size} sx={sx} />
        </div>
    );
};

export default CommonPreloader;