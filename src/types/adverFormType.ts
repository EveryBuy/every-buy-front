export type FormValues = {
  // topSubCategoryId: number | null;
  // lowSubCategoryId: number | null;
  // categoryId: number | null;
  // section: "buy" | "sell" | "";
  // cityId: number | null;
  // productType: string;
  // price: number | "";
  // title: string;
  // description: string;
  // deliveryMethods: string[];
  //------------
  // topSubCategoryId: number | null;
  // lowSubCategoryId: number | null;
  // categoryId: number | null;
  // section: string;
  // cityId: number | null;
  // productType: string;
  // price: string;
  // isNegotiable: boolean;
  // title: string;
  // description: string;
  // deliveryMethods: string[];
  // product: string;
  // category: string;
  // subcategory: string;
  // location: string;
  // condition: string;
  // delivery: string;
  //--------------

  topSubCategoryId: number | null;
  lowSubCategoryId: number | null;
  categoryId: number | null;

  section: "SELL" | "BUY";
  cityId: number | null;

  productType: "NEW" | "USED" | "OTHER" | "";

  price: string | null; // зручно для інпуту; у payload конвертуємо в number | null
  isNegotiable: boolean;

  title: string; // назва оголошення (можна дублювати з product)
  description: string;

  deliveryMethods: string[]; // ["NOVA_POST", ...]
  product: string; // назва товару (UI поле)
  category: string; // "Категорія / Топ / Низ"
  subcategory: string; // опційно
  location: string; // текстове місто (для UI); бек отримує cityId
  condition: "NEW" | "USED" | "OTHER" | ""
};
