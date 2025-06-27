"use client";

import { Search, SliderContainer, Category } from "@/components";
import { Suspense } from "react";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export default function HomePage() {
	return (
		<>
			{/* <ProtectedRoute> */}
			<Suspense fallback={<div>Loading...</div>}>
				<Search style={{ margin: "0 20px" }} />
			</Suspense>
			<SliderContainer />
			<Category />
			{/* </ProtectedRoute> */}
		</>
	);
}
