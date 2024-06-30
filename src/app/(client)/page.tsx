import "../globals.scss";
import Search from "@/components/Search/Search";
import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
import Category from "@/components/Category/Category";
import Test from "../../components/Test/Test";

export default function HomePage() {
  return (
    <main>
      <Search />
      <SliderContainer />
      <Category />
      <Test />
    </main>
  );
}
