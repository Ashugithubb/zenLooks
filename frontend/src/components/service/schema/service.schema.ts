
import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, { message: 'Please enter title' }),
  description: z.string().min(6, { message: 'Please enter description' }),
  price: z.number().min(1,{ message: 'Please enter regular price' }),
  time: z.number().min(1,{message:"Please enter duration"}),
  discount: z.number().optional(),
 category: z.enum(["Male", "Female",""]),
  imageUrl:z.string().optional()
});


type ServiceData = z.infer<typeof serviceSchema>;
