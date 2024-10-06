import "../../globals.scss";
import { AboutMe } from "@/components";
import MobileProfileMenu from "@/components/pages/MobileProfileMenu";

export default function Page() {
  return (
    <>
      <div className="mobileHidden">
        {/* <p>Контактна інформація</p> */}
        <AboutMe />
      </div>
      <div className="laptopHidden">
        <MobileProfileMenu />
      </div>
    </>
  );
}
