export default interface ListItemsForSearch {
	advertisementId: number;
	title: string;
	topSubCategory: {
		subCategoryNameUkr: string;
	};
	category: {
		nameUkr: string;
	};
	section?: string;
	[key: string]: any;
}
