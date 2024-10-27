"use client";

import React from "react";
import LayoutProps from "@/types/layoutProp";
import { Container, Box, Typography } from "@mui/material";
import { CustomSeparator } from "@components/shared";
import { FilterCatalogySearch } from "@components/filterCatalogy";

const styles = {
  display: "flex",
  flexDirection: "column",
};

const CatalogyLayout = ({ children }: LayoutProps) => {
  return (
    <Container sx={{ marginTop: "1rem" }}>
      <Box className="custom-separator" maxWidth={"sm"}>
        <CustomSeparator />
      </Box>
      <Box sx={styles}>
        <Typography variant="h3" sx={{ margin: "2.5rem 0" }}>
          Фільтри
        </Typography>
        <FilterCatalogySearch />
      </Box>
      <Typography variant="h3">Ми знайшли понад 1000 оголошень</Typography>
      {children}
    </Container>
  );
};

export default CatalogyLayout;
