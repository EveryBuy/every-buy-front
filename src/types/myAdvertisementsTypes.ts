export type AdvertItem = {
  id: number;
  section: "BUY" | "SELL" | string;
  title: string;
  state: string;
  price: number;
  userId: number;
  mainPhotoUrl: string;
  favouriteCount: number;
  view: number;
};

export type MyAdvertItemType = {
  item: AdvertItem;
};