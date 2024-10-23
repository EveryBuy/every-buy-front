// 'use client';

import "../globals.scss";
import { Search, SliderContainer, Category } from "@/components";
import Announcement from "./announcement/page";
// import Test from "../../components/Test/Test";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export default function HomePage() {
  return (
    <>
      {/* <ProtectedRoute> */}
      <Search />
      <SliderContainer />
      <Category />
      <Announcement />

      {/* <Test /> */}
      {/* </ProtectedRoute> */}
    </>
  );
}
