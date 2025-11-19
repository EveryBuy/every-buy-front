import Image from 'next/image';
import styles from "./SearchSuggest.module.scss";
import imgSearchEmpty from '@/assets/Svg/searchEmpty.svg';

export const SuggestEmpty = (): JSX.Element => {
	return (
		<div className={styles.searchEmptyWrapper}>
			<div className={styles.searchEmptyTitle}>Нажаль ми не знайшли жодного оголошення</div>
			<Image
				src={imgSearchEmpty}
				sizes="(max-width: 480px) 144px, 175px, (max-width: 2600px) 288px, 350px"
				// width={288}
				// height={350}
				alt="не має оголошення"
			/>
		</div>
	);
}