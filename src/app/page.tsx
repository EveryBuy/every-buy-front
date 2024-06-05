// import Category from "@/components/Category/Category";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import CommonButton from "@/components/CommonButton/CommonButton";
import "./globals.scss";
import CommonIcon from "@/components/CommonIcon/CommonIcon";

export default function HomePage() {
  return (
    <body>
      <Header />
      <main>
        <h2>Home Page</h2>
        <CommonButton type="button" title="hello" color="white" />
        <CommonIcon id='icon-heart' width='30' height='30'/>
        {/* <Category/> */}
      </main>
      <Footer />
    </body>
  );
}
