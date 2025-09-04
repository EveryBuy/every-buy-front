import Image from "next/image";

export default function Loading() {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "white",
				zIndex: 9999,
			}}
		>
			<Image
				src="/logo-loader.gif"
				alt="Loading..."
				width={140}
				height={77}
				unoptimized
				priority
			/>
		</div>
	);
}