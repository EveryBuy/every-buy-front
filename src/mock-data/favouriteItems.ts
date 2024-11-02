import { favouriteAdvertisementItemType } from "@/types/favouriteAdvertisementItemType";

const item: favouriteAdvertisementItemType = {
    userId: 0,
    advertisementId: 1,
    mainPhotoUrl:
      "https://everybuy-category.s3.eu-north-1.amazonaws.com/Fashion+%26+Style.jpeg",
    title: "Example Advertisement",
    productType: "NEW",
    price: 100,
    updateDate: "2024-11-01T20:31:54.689Z",
    category: {
      id: 1,
      categoryName: "Fashion and Style",
      nameUkr: "Мода і стиль",
      photoUrl:
        "https://everybuy-category.s3.eu-north-1.amazonaws.com/Fashion+%26+Style.jpeg",
    },
    city: {
      id: 0,
      cityName: "Київ",
      region: {
        id: 0,
        regionName: "Київська область",
      },
    },
};
  
export const favouriteItems = Array.from({ length: 15 }, () => ({ ...item })) as favouriteAdvertisementItemType[];