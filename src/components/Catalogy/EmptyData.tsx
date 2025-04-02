import Image from "next/image";
import imgSearchEmpty from "@/assets/Svg/searchEmpty.svg";
import { Box, Typography } from "@mui/material";


export const EmptyData = (): JSX.Element => {
	return (
		<Box
			sx={{
				margin: { xs: "32px 2em 0", sm: "52px 2em 0" },
				textAlign: "center",
			}}
		>
			<Typography
				sx={{
					fontSize: { xs: "1.5em", sm: "2em" },
					marginBottom: { xs: "40px", sm: "60px" },
				}}
			>
				Нажаль ми не знайшли жодного оголошення за вашим запитом.
			</Typography>
			<Image
				src={imgSearchEmpty}
				width={288}
				height={350}
				alt="не має оголошення"
			/>
			<Typography
				sx={{
					fontSize: { xs: "1.5em", sm: "2em" },
					marginTop: { xs: "40px", sm: "60px" },
				}}
			>
				Перевірте правильність запиту <br />
				або оберіть будь-яку категорію для перегляду оголошень.
			</Typography>
		</Box>
	);
};