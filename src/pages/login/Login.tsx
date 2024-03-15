import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputAdornment, InputLabel, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

type LoginPros = {
  forgotPassword: ()=>void
}
export default function Login({forgotPassword}:LoginPros) {
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
					htmlFor="phone_email"
					sx={{
						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}
				>
					Телефон або email<span style={{ color: "red" }}>*</span>
				</InputLabel>
				<TextField
					autoFocus
					required
					id="phone_email"
					name="phone_email"
					label="введіть номер телефону або email"
					type="text"
					fullWidth
					variant="standard"
					sx={{ height: 66, width: "inherit" }}
				/>
				<InputLabel htmlFor="password" sx={{
          						width: 160,
						height: 23,
						padding: "0 0 4px 0",
					}}>
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
          sx={{
            height: 66,
            width: 'inherit'
          }}
				/>
			</DialogContent>
      <Box sx={{
        textAlign: 'right',
        marginBottom: 37,
        marginTop: 2
      }}>
      <Link onClick={forgotPassword}>Забули пароль?</Link>
      </Box>
			<DialogActions>
				<Button type="submit">Увійти</Button>
			</DialogActions>
		</>
	);
}
