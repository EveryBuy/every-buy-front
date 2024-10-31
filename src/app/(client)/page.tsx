import { Search, SliderContainer, Category } from "@/components";
// import ProtectedRoute from "../../components/auth/Login/ProtectedRoute/ProtectedRoute";

export default function HomePage() {
  return (
    <>
      {/* <ProtectedRoute> */}
      <Search />
      <SliderContainer />
      <Category />
      {/* </ProtectedRoute> */}
    </>
  );
}
