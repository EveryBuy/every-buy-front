"use client";

import "../globals.scss";
import Search from "@/components/Search/Search";
import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
import Category from "@/components/Category/Category";
import ProtectedRoute from "../Lofin-Register-feature/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main>
        <Search />
        <SliderContainer />
        <Category />
      </main>
    </ProtectedRoute>
  );
}
