import styles from './Card.module.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from '@mui/material';

interface CatalogyCardProps {
    imageUrl: string;
    title: string;
    status: string;
    price: string;
    description: string;
    timestamp: string;
}

export function CatalogyCard({
    imageUrl,
    title,
    status,
    price,
    description,
    timestamp,
}: CatalogyCardProps) {
    return (
        <Card className={styles.card} variant='outlined'>
            <CardContent
                className={styles['card-details']}
                sx={{ padding: '0' }}
            >
                <Box className={styles['card-details-header']}>
                    <CardMedia
                        component='img'
                        src={imageUrl}
                        alt='placehold image'
                        className={styles['card-details-header-image']}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                    >
                        <Box>
                            <Typography
                                variant='h2'
                                fontWeight={'400'}
                                fontSize={'36px'}
                                className={styles['card-details-header-title']}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant='body1'
                                fontWeight={'400'}
                                fontSize={'16px'}
                                className={styles['card-details-header-status']}
                            >
                                {status}
                            </Typography>
                        </Box>
                        <Typography
                            variant='h5'
                            fontWeight={'600'}
                            className={styles['card-details-header-price']}
                        >
                            {price}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography
                        variant='body1'
                        marginTop={'30px'}
                        className={styles['card-details-desc']}
                    >
                        {description}
                    </Typography>
                </Box>
            </CardContent>
            <Box className={styles['card-item-2']}>
                <Typography
                    variant='subtitle2'
                    fontWeight={'400'}
                    fontSize={'14px'}
                    color='#9D9D9D'
                    sx={{ padding: '0' }}
                >
                    {timestamp}
                </Typography>
            </Box>
            <Box className={styles['card-item-3']}>
                <IconButton>
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton sx={{ border: '1px solid black' }}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
        </Card>
    );
}
