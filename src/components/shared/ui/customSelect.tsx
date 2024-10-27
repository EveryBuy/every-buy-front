import { CustomSelectProps } from "../types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
