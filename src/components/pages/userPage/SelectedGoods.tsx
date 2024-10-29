"use client";

import { FC, useState } from "react";
import s from "./UserPage.module.scss";
import CommonSelect from "@/components/ui/CommonSelect/CommonSelect";

const ocupation = ["Businessman", "Employee", "Freelancer", "Retired"];
const widthSize = {
  mobile: "0",
  tablet: "406px",
  laptop: "280px",
};

const SelectedGoods: FC = () => {
  const [category, setCategory] = useState("");

  return (
    <>
      <h3 className={s.headline}>Мої обрані товари</h3>
      <CommonSelect
        label="Виберіть категорію"
        options={ocupation}
        size={widthSize}
        outlineColor="var(--button)"
        value={category}
        onChange={(evt) => setCategory(evt.target.value)}
      />
    </>
  );
};

export default SelectedGoods;
