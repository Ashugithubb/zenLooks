import { z } from 'zod';

export const createUnavailableSlotSchema = z.object({
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  start_time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Start time must be in HH:mm format"
  }),
  end_time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "End time must be in HH:mm format"
  }),
  reason: z.string().min(1, { message: "Reason is required" }),
});