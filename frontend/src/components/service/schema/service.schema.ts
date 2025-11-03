
import { z } from "zod";

export enum Gender {
  MALE="Male",
  Female="Female"
}
export const serviceSchema = z.object({
  title: z.string()
    .trim()
    .min(3, { message: 'Please enter service name' }),

  description: z.string()
    .trim()
    .min(6, { message: 'Please enter description' }),
  price: z.number().min(1, { message: 'Please enter regular price' }),
  time: z.number().min(1, { message: "Please enter duration" }),
  discount: z.number().max(100,{message:"Discount cannot be more then 100%"}).optional(),
  category: z.enum(Gender,{message:"Please select category"}),
  imageUrl: z.string().optional()
});


type ServiceData = z.infer<typeof serviceSchema>;
