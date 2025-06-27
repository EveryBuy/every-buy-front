"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { CommonPreloader, CommonSectionSelector } from "@/components";
import { fetchCategoryData } from "@/api/fetchCategoryData";
// import Fold from "@/assets/Svg/fold.svg";
import CategoryItem from "@/types/categoryItemType";
import styles from "./Category.module.scss";

const Category: React.FC = () => {
	const [data, setData] = useState<CategoryItem[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isListOpen, setListOpen] = useState(false);
	const [section, setSection] = useState<"SELL" | "BUY">(useAppSelector(state => state.filters.section));

	const makeLinkOpen = () => {
		setListOpen((prev) => !prev);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchCategoryData();
				setData(result);
			} catch (error: any) {
				console.error("Error fetching data:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div style={{ padding: "160px 0 50px" }}>
				<CommonPreloader size={40} sx={{ color: "#e5ff46" }} />
			</div>
		);
	}

	if (error) {
		return <div className={styles.error}>Error: {error}</div>;
	}

	return (
		<>
			<div className={styles.sectionContainer}>
				<div className={styles.titleContainer}>
					<h2 className={styles.title}></h2>
					<CommonSectionSelector section={section} setSection={setSection} />
				</div>
				<div className={styles.wrapperHiddenText}>
					<h2 className={styles.hiddenText} onClick={makeLinkOpen}>
						{isListOpen ? "Сховати" : "Дивитись усі"}
					</h2>
				</div>
				{data && data.length > 0 ? (
					<ul className={isListOpen ? styles.listAll : styles.list}>
						{data.map(({ id, nameUkr, photoUrl }) => (
							<li className={styles.listItem} key={id}>
								<Link href={`/catalogy?categoryId=${id}`}>
									<div className={styles.listItemWrapper}>
										<Image
											className={styles.listItemImage}
											src={photoUrl}
											alt={nameUkr}
											width={98}
											height={98}
											style={{ objectFit: "cover" }}
										/>
										<p className={styles.listItemText}>{nameUkr}</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className={styles.textAvailable}>No data available</p>
				)}
			</div>
		</>
	);
};

export default Category;
