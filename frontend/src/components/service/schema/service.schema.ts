
import { z } from "zod";

enum Gender {
  MALE="Male",
  Female="Female"
}
export const serviceSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: 'Please enter Service Name' }),

  description: z.string()
    .trim()
    .min(6, { message: 'Please enter description' }),
  price: z.number().min(1, { message: 'Please enter regular price' }),
  time: z.number().min(1, { message: "Please enter duration" }),
  discount: z.number().optional(),
  category: z.enum(Gender,{message:"Please Select Category"}),
  imageUrl: z.string().optional()
});


type ServiceData = z.infer<typeof serviceSchema>;
