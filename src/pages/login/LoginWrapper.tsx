import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Login from "./Login";
import Registration from "./Registration";

export default function LoginWrapper({ isOpen }: {isOpen: boolean}) {
	const [open, setOpen] = React.useState(isOpen);
	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	const [activeTab, setActiveTab] = React.useState("login");

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		console.dir(formJson);
	};

	const toggleTab = (tab: string) => {
		setActiveTab(tab);
	};

	const forgotPassword = () => {};

	let buttonStyles = {
		background: "none",
		width: 184,
		height: 54,
		top: 44,
		left: 77,
		padding: "10px 63px 10px 63px",
		gap: 10,
		borderRadius: 10,
	};

	let tabWindow =
		activeTab === "login" ? (
			<Login forgotPassword={forgotPassword} />
		) : (
			<Registration />
		);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: "form",
				onSubmit: handleSubmit,
			}}
			sx={{
				width: 574,
				height: 765,
				top: 25,
				left: 60,
				borderRadius: 20,
				border: "4px solid #E5FF46",
			}}
		>
			<div
				style={{
					marginLeft: 77,
					marginTop: 44,
					marginBottom: 40,
				}}
			>
				<Button
					variant="contained"
					sx={{
						...buttonStyles,
						background: activeTab === "login" ? "#E5FF46" : "none",
						marignRight: 40,
					}}
					onClick={() => {
						toggleTab("login");
					}}
				>
					Вхід
				</Button>
				<Button
					variant="contained"
					sx={{
						...buttonStyles,
						background: activeTab === "registration" ? "#E5FF46" : "none",
					}}
					onClick={() => {
						toggleTab("registration");
					}}
				>
					Реєстрація
				</Button>
			</div>
			{tabWindow}
		</Dialog>
	);
}
