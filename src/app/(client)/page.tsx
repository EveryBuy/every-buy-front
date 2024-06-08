import SliderComponent from "@/components/SliderComponent/SliderComponent";
import "../globals.scss";
import Search from "@/components/Search/Search";
// import Category from "@/components/Category/Category";

export default function HomePage() {
  return (
    <main>
      <Search />
      <SliderComponent />
      {/* <Category /> */}
    </main>
  );
}
