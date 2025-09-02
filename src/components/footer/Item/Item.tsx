import React, { FC } from "react";
import { CommonIcon } from "@/components";
import ItemType from "@/types/footerItemType";
import styles from "../FooterMobile/FooterMobile.module.scss";
import Link from "next/link";

const Item: FC<ItemType> = ({ id, text, link }) => {
	return (
		<Link href={link}>
			<div className={styles.wrapperIcon}>
				<CommonIcon id={id} width="24" height="24" />
			</div>
			<span className={styles.linkText}>{text}</span>
		</Link>
	);
};

export default Item;
