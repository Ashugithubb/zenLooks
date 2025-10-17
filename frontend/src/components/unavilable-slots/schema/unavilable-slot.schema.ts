import { z } from 'zod';

export const createUnavailableSlotSchema = z.object({
  date: z.string().nonempty("Date is required"),
   start_time: z.string().nonempty("Start time is required"),
  end_time: z.string().nonempty("End time is required"),
  reason: z.string().trim().min(1, { message: "Reason is required" }),
});

  