import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
// import styles from "../Footer.module.scss";
import Link from "next/link";

const Item: FC<ItemType> = ({ id, text, link }) => {
	return (
		<Link href={link}>
			<CommonIcon id={id} width="28" height="28" />
			<span>{text}</span>
		</Link>
	);
};

export default Item;
