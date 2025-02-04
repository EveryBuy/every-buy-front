export type CategoryBreadcrumbType = {
	id: number,
	title: string,
	link: string
	// for category link={`/catalogy?categoryId=${category.id}`}
	// for topSubCategory link={`/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategory.id}`
	// for lowSubCategory link={`/catalogy?categoryId=${categoryId}&topSubCategoryId=${topSubCategoryId}&lowSubCategoryId=${lowSubCategory.id}`
}

export type CategotyTopAndLowType = {
	category: CategoryBreadcrumbType | null,
	topCategory: CategoryBreadcrumbType | null,
	lowCategory: CategoryBreadcrumbType | null
}