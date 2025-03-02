"use client";

import { Breadcrumbs, Typography, Link, Stack } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

type Props = {
  category: string;
};

export function CustomSeparator(props: Props) {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="#9D9D9D"
      href="/"
      onClick={handleClick}
    >
      Головна
    </Link>,
    <Typography key="2" sx={{ color: "#9D9D9D" }}>
      {props.category || "Усі категорії"}
    </Typography>,
  ];

  return (
    <Stack spacing={1}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
