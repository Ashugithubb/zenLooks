"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import {
  AdapterDayjs
} from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { createUnavailableSlotSchema } from "./schema/unavilable-slot.schema";
import { useAppDispatch } from "@/app/redux/hook/hook";
import { createUnavailableSlot } from "@/app/redux/thunk/slots/unavailable.slot.thunk";
import { toast, ToastContainer } from "react-toastify";

type FormData = z.infer<typeof createUnavailableSlotSchema>;

export default function AddUnavailableSlotDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createUnavailableSlotSchema),
    mode: "onChange",
    defaultValues: {
      date: "",
      start_time: "",
      end_time: "",
      reason: "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormData) => {
    const res = await dispatch(createUnavailableSlot(data));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Unavailable slot added successfully!");
      setTimeout(()=>{
          handleClose();
      },200)
    } else {
      toast.error(res.payload || "Failed to add slot");
    }
  };

  return (
    <>
    <ToastContainer/>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={handleOpen}>
        Add Unavailable Slot
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Unavailable Slot</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Select Date"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newDate: Dayjs | null) =>
                  field.onChange(newDate ? newDate.format("YYYY-MM-DD") : "")
                }

                disablePast
                slotProps={{
                  textField: {
                    error: !!errors.date,
                    helperText: errors.date?.message,
                  },
                }}
              />
            )}
          />


          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  ampm={false}
                  value={
                    field.value ? dayjs(field.value, "HH:mm:ss") : null
                  }
                  onChange={(newDate: Dayjs | null) =>
                    field.onChange(
                      newDate ? newDate.format("HH:mm:ss") : ""
                    )
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.start_time,
                      helperText: errors.start_time?.message,
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            )}
          />


          <Controller
            name="end_time"
            control={control}
            render={({ field }) => (
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="End Time"
                  ampm={false}
                  value={
                    field.value ? dayjs(field.value, "HH:mm:ss") : null
                  }
                  onChange={(newDate: Dayjs | null) =>
                    field.onChange(
                      newDate ? newDate.format("HH:mm:ss") : ""
                    )
                  }
                  slotProps={{
                    textField: {
                      error: !!errors.end_time,
                      helperText: errors.end_time?.message,
                    },
                  }}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            )}
          />


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
    </>
  );
}
