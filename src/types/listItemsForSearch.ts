// export default interface ListItemsForSearch {
// 	advertisementId: number;
// 	title: string;
// 	topSubCategory: {
// 		subCategoryNameUkr: string;
// 	};
// 	category: {
// 		nameUkr: string;
// 	};
// 	section?: string;
// 	[key: string]: any;
// }

export type Advertisement = {
	advertisementId: number,
	title: string,
	category: {
		id: number,
		categoryName: string,
		nameUkr: string,
		photoUrl: string,
	},
	topSubCategory: {
		id: number,
		subCategoryName: string,
		subCategoryNameUkr: string
	},
	section?: string,
	city: {},
	description: string,
	lowSubCategory: {},
	mainPhotoUrl: string,
	price: string,
	productType: string,
	updateDate: string,
	userId: number
}

export type ListItemsForSearch = Pick<Advertisement,
	"advertisementId" | "title" | "category" | "topSubCategory" | "section">;
