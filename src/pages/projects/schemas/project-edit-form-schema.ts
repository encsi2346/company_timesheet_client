import { z } from 'zod';

export const projectEditFormSchema = (isEditing: boolean) =>
    z.object({
            title: z.string(),
            partner: z.string(),
            projectStatus: z.coerce.number().int().optional(),
            projectType: z.coerce.number().int().optional(),
            estimatedStartDate: z.date().optional(),
            estimatedEndDate: z.date().optional(),
            estimatedHours: z.number().positive().int(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
            estimatedGrossEarnings: z.number().positive().int().optional(),
            estimatedGrossExpenditure: z.number().positive().int().optional(),
            projectManagerId: z.coerce.number().int().optional(),
    });

export type ProjectEditFormSchema = z.infer<ReturnType<typeof projectEditFormSchema>>;