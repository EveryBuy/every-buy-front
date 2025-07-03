export type FormValues = {
  topSubCategoryId: number | null;
  lowSubCategoryId: number | null;
  categoryId: number | null;
  section: "buy" | "sell" | "";
  cityId: number | null;
  productType: string;
  price: number | "";
  title: string;
  description: string;
  deliveryMethods: string[];
};
