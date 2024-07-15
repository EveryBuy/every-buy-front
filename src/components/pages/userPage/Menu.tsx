// "use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";

const Menu = () => {
  // const pathname = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/user/about-me">Про мене</Link>
        </li>
        <li>
          <Link href="/user/my-goods">Обрані товари</Link>
        </li>
        <li>
          <Link href="/user/my-ads">Мої оголошення</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
