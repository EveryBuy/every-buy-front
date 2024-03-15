import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { InputAdornment, InputLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Registration() {
	return (
		<>
			<DialogTitle
				sx={{
					fontFamily: "Inter",
					fontSize: 36,
					fontWeight: 400,
					lineHeight: 44,
					letterSpacing: "0em",
					textAlign: "left",
					marginBottom: 32,
				}}
			>
				Вхід
			</DialogTitle>
			<DialogContent
				sx={{
					width: 420,
				}}
			>
				<InputLabel
					htmlFor="phone"
					sx={{
						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}
				>
					Телефон<span style={{ color: "red" }}>*</span>
				</InputLabel>
				<TextField
					autoFocus
					required
					id="phone"
					name="phone"
					label="введіть свій номер телефону"
					type="phone"
					fullWidth
					variant="standard"
					sx={{ height: 66, width: "inherit" }}
				/>

				<InputLabel
					htmlFor="email"
					sx={{
						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}
				>
					E-mail<span style={{ color: "red" }}>*</span>
				</InputLabel>
				<TextField
					autoFocus
					required
					id="email"
					name="email"
					label="введіть свій e-mail"
					type="email"
					fullWidth
					variant="standard"
					sx={{ height: 66, width: "inherit" }}
				/>

				<InputLabel
					htmlFor="password"
					sx={{
						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}
				>
					Введіть пароль<span style={{ color: "red" }}>*</span>
				</InputLabel>
				<TextField
					autoFocus
					required
					id="password"
					name="password"
					label="введіть свій пароль"
					type="password"
					fullWidth
					variant="standard"
					InputProps={{
						startAdornment: (
							<InputAdornment position="end">
								<VisibilityIcon />
							</InputAdornment>
						),
					}}
				/>
				<InputLabel
					htmlFor="confirm_password"
					sx={{
						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}
				>
					Введіть пароль ще раз<span style={{ color: "red" }}>*</span>
				</InputLabel>
				<TextField
					autoFocus
					required
					id="confirm_password"
					name="confirm_password"
					label="введіть свій пароль"
					type="password"
					fullWidth
					variant="standard"
					InputProps={{
						startAdornment: (
							<InputAdornment position="end">
								<VisibilityIcon />
							</InputAdornment>
						),
					}}
					sx={{
						height: 66,
						width: "inherit",
						marginBottom: 40,
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button type="submit">Зареєструатися</Button>
			</DialogActions>
		</>
	);
}
