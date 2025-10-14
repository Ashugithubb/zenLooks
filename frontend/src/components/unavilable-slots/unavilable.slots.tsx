"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { createUnavailableSlotSchema } from "./schema/unavilable-slot.schema";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { createUnavailableSlot } from "@/app/redux/thunk/slots/unavailable.slot.thunk";



type FormData = z.infer<typeof createUnavailableSlotSchema>;

export default function AddUnavailableSlotDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createUnavailableSlotSchema),
  });

  const selectedDate = watch("date");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    dispatch(createUnavailableSlot(data))
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={handleOpen}>
        Add Unavailable Slot
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Unavailable Slot</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

          <DatePicker
            label="Select Date"
            value={selectedDate ? dayjs(selectedDate) : null}
            onChange={(newDate: Dayjs | null) => setValue("date", newDate?.toISOString() || "")}
            disablePast
            slotProps={{
              textField: {
                error: !!errors.date,
                helperText: errors.date?.message,
              },
            }}
          />

        


          <TextField
            label="Start Time (HH:mm)"
            {...register("start_time")}
            error={!!errors.start_time}
            helperText={errors.start_time?.message}
          />

          {/* End Time */}
          <TextField
            label="End Time (HH:mm)"
            {...register("end_time")}
            error={!!errors.end_time}
            helperText={errors.end_time?.message}
          />

          {/* Reason */}
          <TextField
            label="Reason"
            {...register("reason")}
            error={!!errors.reason}
            helperText={errors.reason?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
