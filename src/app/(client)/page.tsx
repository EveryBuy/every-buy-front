import "../globals.scss";
import Search from "@/components/Search/Search";
import SliderContainer from "@/components/slyder/SliderContainer/SliderContainer";
import Category from "@/components/Category/Category";

export default function HomePage() {
  return (
    <main>
      <Search />
      <SliderContainer />
      <Category />
    </main>
  );
}
