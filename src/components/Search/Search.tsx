"use client";

import { FC, useState } from "react";
import { CommonIcon, CommonButton } from "@/components";
import styles from "./Search.module.scss";
import { useRouter } from 'next/navigation';

const Search: FC = (props) => {

	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = (): void => {
		router.push(`/search?q=${search}`);
	};

	return (
		<div className={styles.searchContainer}>
			<form className={styles.searchForm}>
				<div className={styles.searchInputWrapper}>
					<input
						className={styles.searchInput}
						placeholder="Що шукаєте?"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
					<div className={styles.searchInputIconWrapper}>
						<CommonIcon
							id="icon-search"
							width="28"
							height="28"
							className={styles.searchInputIcon}
						/>
					</div>
				</div>
				<CommonButton
					type="submit"
					title=""
					color="white"
					className={styles.searchButton}
					onClick={goToSearch}
				>
					<CommonIcon
						id="icon-search"
						width="25"
						height="25"
						className={styles.searchButtonIcon}
					/>
				</CommonButton>
			</form>
		</div>
	);
};

export default Search;
