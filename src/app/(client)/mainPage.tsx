"use client";

import { Search, SliderContainer, Category } from "@/components";
import { Suspense } from "react";


export default function MainPage() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Search style={{ margin: "0 20px" }} />
			</Suspense>
			<SliderContainer />
			<Category />
		</>
	);
}
