import "../globals.scss";
import { Search, SliderContainer, Category } from "@/components";
// import Test from "../../components/Test/Test";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export default async function HomePage() {
  return (
    <>
      {/* <ProtectedRoute> */}
      <Search />
      <SliderContainer />
      <Category />
      {/* <Test /> */}
      {/* </ProtectedRoute> */}
    </>
  );
}
