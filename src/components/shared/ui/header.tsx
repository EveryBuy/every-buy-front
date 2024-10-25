/**
 * Лайоут, який слугує оболнкою
 *
 * @returns {JSX.Element} - повертає jsx element
 */

import { Box, Container, Paper } from "@mui/material";

import HeaderBanner from "./headerBanner";
import HeaderNavigation from "./headerNavigation";

export function Header() {
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem 0",
          width: "100%",
          backgroundColor: "secondary.main",
        }}
      >
        <nav>
          <HeaderNavigation />
        </nav>
      </Box>
      <Paper elevation={1}>
        <Container
          sx={{
            padding: ".5rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // position: "fixed",
          }}
        >
          <HeaderBanner />
        </Container>
      </Paper>
    </header>
  );
}
