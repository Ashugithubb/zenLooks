import { z } from "zod";

export const createUnavailableSlotSchema = z
  .object({
    date: z.string().nonempty("Date is required"),
    start_time: z.string().nonempty("Start time is required"),
    end_time: z.string().nonempty("End time is required"),
    reason: z.string().trim().min(1, { message: "Reason is required" }),
  })
  .refine((data) => {
    const start = new Date(`${data.date}T${data.start_time}`);
    const end = new Date(`${data.date}T${data.end_time}`);
    return end > start;
  }, {
    message: "End time must be greater than start time",
    path: ["end_time"],
  });
