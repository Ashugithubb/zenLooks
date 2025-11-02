import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import style from "./category.module.css"
interface GenderSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const GenderSelectComponent: React.FC<GenderSelectProps> = ({ value, onChange, placeholder }) => {
  return (
   <FormControl fullWidth size="small">
      <InputLabel>{placeholder || "Select Gender"}</InputLabel>
      <Select
        value={value}
        label={placeholder || "Select Gender"}
        onChange={(e) => onChange(e.target.value)}
        sx={{width:"220px"}}
        className={style.select}
      >
       
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Select>
    </FormControl>

  );
};

export default GenderSelectComponent;
