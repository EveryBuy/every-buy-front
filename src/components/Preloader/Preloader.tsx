import styles from "./Preloader.module.scss";

export default function Preloader() {
	return (
		<div className={styles.loaderWrapper}>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.circle}></div>
			<div className={styles.shadow}></div>
			<div className={styles.shadow}></div>
			<div className={styles.shadow}></div>
			{/* <span>Loading</span> */}
		</div>
	);
}