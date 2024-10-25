// 'use client';

import "../globals.scss";
import { Search, SliderContainer, Category, Catalogy } from "@/components";
// import Test from "../../components/Test/Test";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export default function HomePage() {
  return (
    <>
      {/* <Catalogy /> */}
      {/* <ProtectedRoute> */}
      <Search />
      <SliderContainer />
      <Category />
      {/* <Test /> */}
      {/* </ProtectedRoute> */}
    </>
  );
}
