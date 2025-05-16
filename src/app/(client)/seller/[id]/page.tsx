import { Suspense } from "react";
import { SellerPage } from "@/components";

export default function Page() {
	return (
		<Suspense>
			<SellerPage />
		</Suspense>
	);
}
