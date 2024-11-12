import { CatalogyCard } from "../../Category/cardCatalogy/CatalogyCard";
import styles from "../../Category/Category.module.scss";

const cardsData = [
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 1",
		status: "Нове",
		price: "1200 UAH",
		description: "Опис картки 1.",
		timestamp: "Вчора 21:30. Київ, Київська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 2",
		status: "Нове",
		price: "1500 UAH",
		description: "Опис картки 2.",
		timestamp: "Вчора 22:00. Київ, Київська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 3",
		status: "Вживане",
		price: "800 UAH",
		description: "Опис картки 3.",
		timestamp: "Сьогодні 10:00. Львів, Львівська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 4",
		status: "Нове",
		price: "1800 UAH",
		description: "Опис картки 4.",
		timestamp: "Сьогодні 11:00. Одеса, Одеська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 5",
		status: "Нове",
		price: "900 UAH",
		description: "Опис картки 5.",
		timestamp: "Вчора 18:30. Харків, Харківська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 6",
		status: "Вживане",
		price: "600 UAH",
		description: "Опис картки 6.",
		timestamp: "Вчора 16:00. Дніпро, Дніпропетровська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 7",
		status: "Нове",
		price: "2000 UAH",
		description: "Опис картки 7.",
		timestamp: "Сьогодні 9:30. Запоріжжя, Запорізька область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 8",
		status: "Нове",
		price: "1100 UAH",
		description: "Опис картки 8.",
		timestamp: "Сьогодні 12:15. Вінниця, Вінницька область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 9",
		status: "Вживане",
		price: "700 UAH",
		description: "Опис картки 9.",
		timestamp: "Сьогодні 14:00. Полтава, Полтавська область",
	},
	{
		imageUrl: "https://placehold.co/180x180",
		title: "Картка 10",
		status: "Нове",
		price: "1600 UAH",
		description: "Опис картки 10.",
		timestamp: "Сьогодні 15:45. Чернігів, Чернігівська область",
	},
];

export const CatalogyPage = () => {
	return (
		<section className={styles["catalog-container"]}>
			{cardsData.map((card, index) => (
				<CatalogyCard
					key={index}
					imageUrl={card.imageUrl}
					title={card.title}
					status={card.status}
					price={card.price}
					description={card.description}
					timestamp={card.timestamp}
				/>
			))}
		</section>
	);
}
