"use client";
import {
  ListItemAvatar,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
};

export function HeaderMenuList({ anchorEl, open, handleClose }: Props) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemAvatar>
          <img src="https://placehold.co/32x32" alt="src" />
        </ListItemAvatar>
        <ListItemText>
          <Link href="/user/about-me" style={{ color: "black" }}>
            Вікторія
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemText>
          <Link href="/user/error" style={{ color: "black" }}>
            Редагування профілю
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemText>
          <Link href="/user/my-ads" style={{ color: "black" }}>
            Оголошення
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemText>
          <Link href="/messages/" style={{ color: "black" }}>
            Повідомлення
          </Link>
        </ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemText>
          <Link href="/user/selected-goods" style={{ color: "black" }}>
            Обрані
          </Link>
        </ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemText>
          <Link href="/error" style={{ color: "black" }}>
            Вихід
          </Link>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
}
