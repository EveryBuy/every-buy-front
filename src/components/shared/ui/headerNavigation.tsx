import { Box, Typography, Link } from "@mui/material";

const nav = [
  {
    title: "Про нас",
    src: "/about-us",
  },
  { title: "Акції", src: "/discount" },
  { title: "Доставки", src: "/delivery" },
  { title: "Контакти", src: "/contact" },
];

export default function HeaderNavigation() {
  return (
    <Box
      component="ul"
      justifyContent="center"
      sx={{
        display: "flex",
        gap: 2,
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontFamily: "fontfamily",
      }}
    >
      {nav.map((item, index) => (
        <li key={index}>
          <Link
            href={item.src}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography variant="body1">{item.title}</Typography>
          </Link>
        </li>
      ))}
    </Box>
  );
}
