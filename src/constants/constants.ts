import { useId } from "react";

export const MOBPROFMENU_ITEMS = [
  {
    title: "Про мене",
    href: "/user/about-me",
  },
  {
    title: "Обрані товари",
    href: "/user/selected-goods",
  },
  {
    title: "Мої оголошення",
    href: "/user/my-ads",
    submenu: true,
    submenuItems: [
      {
        title: "Активні оголошення",
        href: "/user/my-ads/active-ads",
      },
      {
        title: "Неактивні оголошення",
        href: "/user/my-ads/non-active-ads",
      },
    ],
  },
];
