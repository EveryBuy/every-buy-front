import ListItemsForSearch from "@/types/listItemsForSearch";

const BASE_URL: string = "https://api-everybuy.onrender.com";

export const getSearchByWord = async (word: string): Promise<ListItemsForSearch[]> => {

	if (!word && word.length < 1) {
		return [];
	} else {
		const response = await fetch(`${BASE_URL}/ad/filter?keyword=${word}`);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const result = await response.json();
		return result;
	}
};
