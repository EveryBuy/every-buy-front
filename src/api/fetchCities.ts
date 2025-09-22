import axios from "axios";
import type { CityDto } from "@/components/adver/CityAutocomplete/CityAutocomplete";

export async function searchCities(
  keyword: string,
  token?: string,
  signal?: AbortSignal
): Promise<CityDto[]> {
  try {
    const url = `https://api-everybuy.onrender.com/product/city/search`;

    const response = await axios.get<CityDto[]>(url, {
      params: { keyword },
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal,
    });

    // axios автоматично розпарсює json
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    // обробка помилки
    if (axios.isCancel?.(error)) {
      // якщо скасовано (наприклад, signal.abort())
      return [];
    }
    // додатково — можна викинути свою помилку
    throw new Error(
      `City search failed: ${error?.response?.status ?? ""} ${
        error?.response?.data ?? error?.message ?? ""
      }`
    );
  }
}
