export function deliveryToString(arr: string[]): string {
	const deliveryMap: { [key: string]: string } = {
	  "UKR_POST": "Укр пошта",
	  "NOVA_POST": "Нова пошта",
	  "OTHER": "Інше",
	};
  
	if (Array.isArray(arr) && arr.length > 0) {
	  return arr
		.map(item => deliveryMap[item] || "Інше") 
		.join(", ");
	} else {
	  return '';
	}
  }
  