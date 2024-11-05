type Subcategory = {
    id: number,
    subCategoryName: string,
    subCategoryNameUkr: string
}

export type AdvertisementItem =
{
  id: number,
  title: string,
  description: string,
  price: number,
  creationDate: string,
  isEnabled: boolean,
  userId: number,
  mainPhotoUrl: string,
  photoUrls: string[],
  cityName: string,
  regionName: string,
  subcategory: Subcategory,
  productType: string,
  section: string,
  deliveryMethods: string[]
}


