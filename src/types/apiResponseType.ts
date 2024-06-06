import CategoryItem from "./categoryItemType";

export default interface ApiResponse {
  status: number;
  data: CategoryItem[];
}
