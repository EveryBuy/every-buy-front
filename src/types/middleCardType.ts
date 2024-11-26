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

export type middleCardType = {
    advertisementId: number,
    mainPhotoUrl: string,
    title: string,
    productType: "NEW" | "USED" | "OTHER",
    price: number,
		description: string,
    updateDate: string,
    category: Category,
    city: City,
};