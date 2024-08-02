import "../globals.scss";
import Search from "@/components/Search/Search";
import SliderContainer from "@/components/slider/SliderContainer/SliderContainer";
import Category from "@/components/Category/Category";
import Announcement from "./announcement/page";

export default function HomePage() {
  return (
    <main>
      <Search />
      <SliderContainer />
      <Category />

      <Announcement />
    
    </main>
  );
}
