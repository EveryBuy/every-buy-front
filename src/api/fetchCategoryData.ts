import ApiResponse from "@/types/apiResponseType";
import CategoryItem from "@/types/categoryItemType";

export const fetchCategoryData = async (): Promise<CategoryItem[]> => {
  const response = await fetch("/api/ad/category");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result: ApiResponse = await response.json();
  return result.data;
};
