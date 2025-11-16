export type FormValues = {
  topSubCategoryId: number | null;
  lowSubCategoryId: number | null;
  categoryId: number | null;

  section: "SELL" | "BUY";
  categoryLabel: string;

  cityId: number | null;
  location: string;

  productType: "NEW" | "USED" | "OTHER" | "";

  price: string | null;
  priceType: "WITH_PRICE" | "FREE";
  isNegotiable: boolean;

  title: string;
  description: string;

  deliveryMethods: string[];
};
