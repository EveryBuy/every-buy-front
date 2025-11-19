import Link from 'next/link';
import styles from './SearchSuggest.module.scss';
import { ItemSearchType } from '@/types/listItemsForSearch';

type ItemSaggestProps = {
	item: ItemSearchType;
	word: string;
	section: string;
}

export const SuggestItem = (props: ItemSaggestProps): JSX.Element => {

	const {
		categoryId,
		categoryName,
		count,
		topCategoryId,
		topCategoryName,
	} = props.item;

	const word = props.word;

	return (
		<li key={topCategoryId} className={styles.searchSuggestItem}>
			<Link href={`/catalogy?keyword=${word}&categoryId=${categoryId}&topSubCategoryId=${topCategoryId}${props.section === "SELL" ? "" : "&section=BUY"}`}>
				<span className={styles.searchLinkItem}>{word}</span>
				{/* <span className={styles.searchCount}>{count}</span> */}
				<div className={styles.searchItemCategory}>
					{categoryName} / <strong>{topCategoryName}</strong>
					<span className={styles.searchCount}>{count}</span>
				</div>

			</Link>
		</li>
	)
}