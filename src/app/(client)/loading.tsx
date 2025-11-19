import Image from "next/image";

export default function Loading() {
	return (
		<div
			style={{
				// position: "absolute",
				// top: 0,
				// left: 0,
				// right: 0,
				// bottom: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "60px 10px",
				// backgroundColor: "white",
				zIndex: 9999,
			}}
		>
			<Image
				src="/logo-loader.gif"
				alt="Loading..."
				width={300}
				height={216}
				unoptimized
				priority
			/>
		</div>
	);
}