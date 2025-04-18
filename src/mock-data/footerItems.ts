import ItemType from "@/types/footerItemType";

export const footerItems: ItemType[] = [
	{
		id: "icon-home",
		alt: "House",
		text: "Головна",
		link: "/",
	},
	{
		id: "icon-heart",
		alt: "SmallHeart",
		text: "Вибране",
		link: "/user/selected-goods",
	},
	{
		id: "icon-create-plus",
		alt: "AddIcon",
		text: "Створити",
		link: "/",
	},
	{
		id: "icon-chat",
		alt: "Chat",
		text: "Чат",
		link: "/messages",
	},
	{
		id: "icon-user",
		alt: "SmallUser",
		text: "Профіль",
		link: "/user",
	},
];
