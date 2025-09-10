type Category = {
	id: number,
	categoryName: string,
	nameUkr: string,
	photoUrl: string,
}

type Region = {
	id: number,
	regionName: string,
}

type City = {
	id: number,
	cityName: string,
	region: Region,
}

export type CatalogyCardItemType = {
	advertisementId: number,
	mainPhotoUrl: string,
	title: string,
	productType: string,  //"NEW" | "USED" | "OTHER",
	price: string,
	description: string,
	updateDate: string,
	category: Category,
	city: City,
};