import FilterItem  from "@/types/filterItemType";

export const fetchCategoryFilter = async (): Promise<FilterItem[]> => {
    const response = await fetch("/api/ad/filter")

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result = response.json();
    return result
}