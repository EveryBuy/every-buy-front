export type FormValues = {
  product: string;
  price: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  condition: "New" | "Used" | "";
  delivery: "New_mail" | "Ukrposhta" | "Meest_Express" | "Other" | "";
};
