"use client";

import { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { HeaderMenuList } from "./headerMenuList";

export default function HeaderBanner() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <img src="https://placehold.co/103x76" alt="logo" />
      <Box display="flex" alignItems="center" gap={2}>
        <Button variant="contained" color="primary">
          Додати оголошення
        </Button>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon />
        </IconButton>
        <HeaderMenuList
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
}
