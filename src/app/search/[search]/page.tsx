"use client";
import { useState, useEffect } from 'react';
import { getSearchByWord } from '../../../api/getSearchByWord';
import styles from "./Search.module.scss";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function Search(props) {
	const wordSearch: string = decodeURI(props.params.search);
	const [search, setSearch] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchForSearch = async () => {
			try {
				const result = await getSearchByWord(wordSearch);
				setSearch(result);
				setLoading(true);
			} catch (error: any) {
				console.error("Error fetching data:", error);
			}
		};

		fetchForSearch();
	}, []);

	// ЦЕЙ КОМПОНЕНТ ТИМЧАСОВИЙ, ПОКИ НЕ МАЄ КОМПОНЕНТА КАРТКИ ТОВАРА
	const CardItem = ({ item }) => {
		// console.log(item);
		return (
			<Card sx={{ maxWidth: 345 }} key={item.advertisementId}>
				<CardMedia
					sx={{ height: 140 }}
					image={item.mainPhotoUrl}
					title={item.title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.title}
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }}>
						{item.description}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{item.price} грн.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Дізнати більше...</Button>
				</CardActions>
			</Card>
		);
	}

	return (
		<>
			<main>
				<h1>Результати пошуку по запросу: <strong>{wordSearch}</strong></h1>
				{
					!loading
						? <p>Почекайте...</p>
						: search.length > 0
							? <ul className={styles.tempSearchList}>
								{search.map(item => <CardItem item={item} />)}
							</ul>
							: <p>За вашим запросом нічого не знайдено.</p>
				}
			</main>
		</>
	);
}
