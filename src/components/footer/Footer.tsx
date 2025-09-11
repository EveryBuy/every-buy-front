"use client";

import { FC, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { CommonIcon, CommonButton, FooterMobile } from "@/components";
import Logo from "@/assets/logo-white.svg";
import styles from "./Footer.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { subscribeUser } from "@/redux/auth/operations";
import toast from "react-hot-toast";

const Footer: FC = () => {
	const [email, setEmail] = useState("");
	const dispatch = useAppDispatch();
	const { error } = useAppSelector((state) => state.auth);

	const handleSubscribe = () => {
		if (!email.trim()) {
			toast.error("Please enter a valid email.");
			return;
		}

		dispatch(subscribeUser(email))
			.unwrap()
			.then(() => {
				toast.success("Subscription successful!");
				setEmail("");
			})
			.catch((err) => {
				toast.error(err.message || "An error occurred.");
			});
	};

	return (
		<footer className={styles.footerTag}>
			<div className={styles.footerContainer}>
				<div className={styles.wrapperLogo}>
					<Image
						className={styles.logo}
						priority
						src={Logo}
						alt="Logo"
						width={165}
						height={120}
					/>


					<div className={styles.wrapperInfo}>
						<div className={styles.social}>
							<Link href="https://www.facebook.com" target='_blanck'>
								<CommonIcon
									id="facebook-footer"
									width="32"
									height="32"
									className={styles.facebookIcon}
								/>
							</Link>
							<Link href="https://www.instagram.com" target='_blanck'>
								<CommonIcon
									id="instagram-footer"
									width="32"
									height="32"
									className={styles.instagramIcon}
								/>
							</Link>
						</div>
						<div className={styles.contactContainer}>
							<a href="tel:+380(63)0000000" className={styles.contactText}>
								+380(63)0000000
							</a>
							<a href="mailto:EveryBuymarket@gmail.com" className={styles.contactText}>
								EveryBuymarket@gmail.com
							</a>
						</div>
					</div>
				</div>

				<div className={styles.wrapperSearch}>
					<p className={styles.footerText}>
						Бажаєте отримувати повідомлення про новинки?
					</p>
					<div className={styles.wrapperContent}>
						<div className={styles.mailWrapper}>
							<input
								type="email"
								placeholder="Введіть свій e-mail"
								className={styles.emailInput}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<CommonButton
								type="button"
								title="Підписатись"
								color="yellow"
								className={styles.buttonSubscribe}
								onClick={handleSubscribe}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.marketPlace}>
				<p className={styles.marketPlaceText}>Маркетплейс EveryBuy 2024</p>
			</div>
			<FooterMobile />
		</footer>
	);
};

export default Footer;
