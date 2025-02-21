"use client";

import { AdverDesktop } from "@/components";
import { AdverMobile } from "@/components";

import styles from "./advert.module.scss";

const AdvertPage = () => {
  return (
    <>
      <div className={styles.mobileWrapper}>
        <AdverMobile />
      </div>

      <div className={styles.desktopWpapper}>
        <AdverDesktop />
      </div>
    </>
  );
};

export default AdvertPage;

// ==================================================
// import { AdverDesktop } from "@/components";
// import { AdverMobile } from "@/components";
// import { useMatchMedia } from "@/hooks/useMatchMedia";

// const AdvertPage = () => {
//   const { isMobile, isTablet, isLaptop, isDesktop } = useMatchMedia();

//   return (
//     <>
//       {isDesktop && <AdverDesktop />}
//       {isLaptop && !isDesktop && <AdverDesktop />}
//       {isTablet && !isLaptop && !isDesktop && <AdverDesktop />}
//       {isMobile && !isTablet && !isLaptop && !isDesktop && <AdverMobile />}
//     </>
//   );
// };

// export default AdvertPage;
