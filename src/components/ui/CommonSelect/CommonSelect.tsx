"use client";

import { useState, useEffect } from "react";
import {
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { nanoid } from "nanoid";
import styles from "./CommonSelect.module.scss";

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
  onChange?: (event: SelectChangeEvent<string>) => void;
  myLabel?: string;
  setSelectedCategory?: (value: string) => void;
};

export const CommonSelect = ({
  label,
  options,
  size,
  outlineColor = `var(--input-text)`,
  value,
  onChange,
  myLabel,
  setSelectedCategory,
}: CommonSelectProps) => {
  const [firstValue, setFirstValue] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory && setSelectedCategory(event.target.value);
    setFirstValue(event.target.value);
  };

  useEffect(() => {
    if (options.length > 0 && !value) {
      setFirstValue(options[0]);
    }
  }, [options, value]);

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
    <FormControl className={styles.customSelect} sx={{ height: "auto" }}>
      <InputLabel id="select-label">{label}</InputLabel>
      {myLabel && (
        <MenuItem disabled value="">
          {myLabel}
        </MenuItem>
      )}
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={myLabel ? firstValue : value}
        label={myLabel ? null : label}
        // onChange={onChange}
        onChange={myLabel ? handleChange : onChange}
        {...((myLabel && {
          renderValue: (selected: string | unknown) => {
            if (
              !selected ||
              (Array.isArray(selected) && selected.length === 0)
            ) {
              return <em>Placeholder</em>;
            }

            return selected as string;
          },
        }) as { renderValue: SelectProps<string>["renderValue"] })}
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
