import Link from 'next/link';
import Image from 'next/image';
import styles from "./SearchSuggest.module.scss";
import { ItemSearchType, ItemSaggestCat } from '@/types/listItemsForSearch';

type ItemSaggestCatProps = {
	item: ItemSaggestCat;
	word: string;
	section: string;
}

export const SuggestCatItem = (props: ItemSaggestCatProps): JSX.Element => {

	const {
		categoryId,
		categoryName,
		categoryUrl
	} = props.item;

	const word = props.word;

	return (
		<li key={categoryId} className={styles.searchSuggestItem}>
			<Link className={styles.searchLinkCatLink} href={`/catalogy?keyword=${word}&categoryId=${categoryId}${props.section === "SELL" ? "" : "&section=BUY"}`}>
				<Image
					alt=""
					src={categoryUrl}
					width={24}
					height={24}
					className={styles.searchLinkCatImg}
				/>
				<span className={styles.searchLinkCatTitle}>{categoryName}</span>
			</Link>
		</li>
	)
}