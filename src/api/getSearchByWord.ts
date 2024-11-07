import ListItemsForSearch from "@/types/listItemsForSearch";
import { BASE_URL } from './endpoints';

export const getSearchByWord = async (word): Promise<ListItemsForSearch[]> => {  // 
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
