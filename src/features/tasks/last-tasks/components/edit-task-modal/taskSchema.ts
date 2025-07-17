import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  dueDate: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: 'Invalid date format',
    })
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(val);
      return selected >= today;
    }, {
      message: 'Date must not be in the past',
    }),
  type: z.enum(['design', 'dev', 'bug', 'docs', 'meeting', 'travel'], {
    required_error: 'Task type is required',
  }),
});
