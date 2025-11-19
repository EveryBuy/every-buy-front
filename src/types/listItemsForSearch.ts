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

export type ItemSearchType = {
	categoryId: number;
	categoryName: string;
	count: number;
	topCategoryId: number;
	topCategoryName: string;
}

export type ItemSaggestCat = {
	categoryId: number;
	categoryName: string;
	categoryUrl: string;
}

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
	lowSubCategory?: {
		id: number,
		subCategoryName: string,
		subCategoryNameUkr: string
	},
	mainPhotoUrl: string,
	price: string,
	productType: string,
	updateDate: string,
	userId: number
}

export type ListItemsForSearch = Pick<Advertisement,
	"advertisementId" | "title" | "category" | "topSubCategory" | "section" | "lowSubCategory">;
