"use client";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface TimeSlotPickerProps {
  onTimeChange: (times: { startTime: string; endTime: string }) => void;
}

export default function TimeSlotPicker({ onTimeChange }: TimeSlotPickerProps) {
  const [times, setTimes] = useState({ startTime: "", endTime: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...times, [name]: value };
    setTimes(updated);
    onTimeChange(updated);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <TextField
        label="Start Time"
        type="time"
        name="startTime"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }} // 5 min steps
        value={times.startTime}
        onChange={handleChange}
      />
      <TextField
        label="End Time"
        type="time"
        name="endTime"
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300 }}
        value={times.endTime}
        onChange={handleChange}
      />
    </Box>
  );
}
