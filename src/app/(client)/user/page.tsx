import { AboutMe, MobileProfileMenu } from "@/components";

export default function Page() {
	return (
		<>
			<div className="mobileHidden">
				<AboutMe />
			</div>
			<div className="laptopHidden">
				<MobileProfileMenu />
			</div>
		</>
	);
}
