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

export type favouriteAdvertisementItemType = {
    userId: number,
    advertisementId: number,
    mainPhotoUrl: string,
    title: string,
    productType: "NEW" | "USED",
    price: number,
    updateDate: string,
    category: Category,
    city: City,
};