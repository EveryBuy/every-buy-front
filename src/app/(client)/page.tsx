import "../globals.scss";
import Search from "@/components/Search/Search";
import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
import Category from "@/components/Category/Category";
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
