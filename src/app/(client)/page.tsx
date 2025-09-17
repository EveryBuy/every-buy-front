import MainPage from './mainPage';
import { Metadata } from "next";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export const metadata: Metadata = {
	title: "Головна сторінка EveryBuy - сучасна платформа для створення оголошень",
	description: "EveryBuy - сучасна платформа для створення оголошень для продажу та купівля товарів або послуг",
	keywords: ["EveryBuy", "сучасна", "платформа", "оголошення", "продажу", "купівлі", "товарів", "послуг"],
	openGraph: {
		title: "EveryBuy - сучасна платформа для створення оголошень",
		description: "EveryBuy - сучасна платформа для створення оголошень для продажу та купівля товарів або послуг",
		url: "https://everybuy.pp.ua",
		siteName: "EveryBuy",
		// images: [
		// 	{
		// 		url: "https://everybuy.pp.ua/",
		// 		width: 1200,
		// 		height: 630,
		// 		alt: "Превʼю сайту everybuy",
		// 	},
		// ],
		locale: "uk_UA",
		type: "website",
	},
};

export default function HomePage() {
	return (
		<>
			{/* <ProtectedRoute> */}
			< MainPage />
			{/* </ProtectedRoute> */}
		</>
	);
}
