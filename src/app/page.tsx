// import Category from "@/components/Category/Category";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CommonButton from "@/components/CommonButton/CommonButton";
import "./globals.scss";

export default function HomePage() {
  return (
    <body>
      <Header />
      <main>
        <h2>Home Page</h2>
        <CommonButton type="button" title="hello" color="white"/>
        {/* <Category/> */}
      </main>
      <Footer />
    </body>
  );
}
