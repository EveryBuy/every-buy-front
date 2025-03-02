import { Suspense } from "react";
import { Announcement } from "@/components";

export default function Page() {
	return (
		<Suspense>
			<Announcement />
		</Suspense>
	);
}
