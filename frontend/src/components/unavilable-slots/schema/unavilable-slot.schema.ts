import { z } from 'zod';

export const createUnavailableSlotSchema = z.object({
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Please Select Date" }
  ),
  start_time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Please Select Start Time"
  }),
  end_time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Please Select End Time"
  }),
  reason: z.string().trim().min(1, { message: "Reason is required" }),
});

  