'use client';

import { useState, useEffect } from "react";
import { getSearchByWord } from '@/api/getSearchByWord';
import { CatalogyCard } from "../../Catalogy/cardCatalogy/CatalogyCard";
import { Container, Box, Typography } from '@mui/material';
import {
	CustomSeparator,
	FilterCatalogySearch,
	CategoryList,
	Search,
} from '@/components';
import { useSearchParams } from 'next/navigation';
// import { searchGoods } from '@/mock-data/searchGoods';

const styles = {
	display: 'flex',
	flexDirection: 'column',
};

export const CatalogyPage = () => {
	const [isListOpen, setListOpen] = useState(false);
	const [search, setSearch] = useState([]);
	const [loading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const wordSearch = searchParams.get('search') ? searchParams.get('search') : "";
	// const [word, setWord] = useState<string | null>(wordSearch);

	const makeLinkOpen = () => {
		setListOpen((prev) => !prev);
	};

	useEffect(() => {
		const fetchForSearch = async () => {
			try {
				const result = await getSearchByWord(wordSearch);
				setSearch(result);
				setLoading(true);
				console.log(search);

			} catch (error: any) {
				console.error("Error fetching data:", error);
			}
		};

		fetchForSearch();
	}, [wordSearch]);

	return (
		<Container sx={{ marginTop: '1rem' }}>
			<Box className='custom-separator' maxWidth={'sm'}>
				<CustomSeparator category="Moda" />
			</Box>
			<Box sx={{ margin: "2em 1em" }}>
				<Search />
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", margin: '2.5rem 0' }}>
				<Typography variant='h3' sx={{ fontSize: '2.3em' }}>
					Фільтри
				</Typography>
				<Typography variant='h3'
					sx={{ fontSize: '1em', cursor: "pointer" }}
					onClick={makeLinkOpen}>
					{isListOpen ? "Згорнути" : "Розгорнути"}
				</Typography>
			</Box>
			<Box className={isListOpen ? styles : "hidden"}>
				<FilterCatalogySearch />
			</Box>

			<CategoryList />
			<Typography variant='h3' sx={{ margin: '1rem 0 2.3rem', fontSize: '2.3em' }}>
				Ми знайшли понад 1000 оголошень
			</Typography>
			{
				search.length > 0
					? <CatalogyCard item={search} />
					: <CatalogyCard />
			}
		</Container>
	);
}