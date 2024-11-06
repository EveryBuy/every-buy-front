"use client";

import {
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import styles from "./CommonSelect.module.css";
import { nanoid } from "nanoid";

type CommonSelectProps = {
  label: string;
  options: string[];
  size: {
    mobile: string;
    tablet: string;
    laptop: string;
  };
  outlineColor?: string;
  value?: string;
  onChange: (event: SelectChangeEvent<string>) => void;
};

export const CommonSelect = ({
  label,
  options,
  size,
  outlineColor = `var(--input-text)`,
  value = "",
  onChange,
}: CommonSelectProps) => {
  const display = Object.entries(size).reduce((acc, [key, value]) => {
    acc[key] = value === "0" ? "none" : "flex";
    return acc;
  }, {} as { [key: string]: string });

  const FormControl = styled(MuiFormControl)<SelectProps>(({ theme }) => ({
    width: `${size.mobile}` || "auto",
    height: "60px",
    display: display.mobile,

    [theme.breakpoints.up("sm")]: {
      width: size.tablet,
      display: display.tablet,
    },

    [theme.breakpoints.up("lg")]: {
      width: size.laptop,
      display: display.laptop,
    },

    "& .MuiInputBase-root": {
      borderRadius: 10,
      backgroundColor: theme.palette.background.paper,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(157, 157, 157)",
    },

    "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${outlineColor}`,
    },

    "& .MuiInputLabel-root": {
      color: `var(--input-text)`,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: `var(--input-text)`, // Змінюємо label ярлика при фокусі. В даному випадку заблокована
    },
  }));

  return (
    <FormControl className={styles.customSelect}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((elem) => (
          <MenuItem key={nanoid()} value={elem}>
            {elem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CommonSelect;
