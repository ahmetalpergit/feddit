import { z } from 'zod';

export const ShareFormSchema = z.object({
  text: z
    .string()
    .min(1, 'You must enter a fact')
    .max(200, "You can't have more than 200 characters"),
  source: z.string().min(1, 'You must have a source'),
  category: z.string().min(1),
  votes: z.object({
    interesting: z.number(),
    report: z.number(),
    shocking: z.number(),
  }),
});
