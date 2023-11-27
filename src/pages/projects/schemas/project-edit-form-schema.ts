import { z } from 'zod';

export const projectEditFormSchema = (isEditing: boolean) =>
    z.object({
            title: z.string(),
            partner: z.string(),
            projectStatus: z.number().positive().int().optional(),
            projectType: z.number().positive().int().optional(),
            projectManagerGivenName: z.string(),
            projectManagerFamilyName: z.string(),
            estimatedStartDate: z.date().optional(),
            estimatedEndDate: z.date().optional(),
            estimatedHours: z.number().positive().int(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
            estimatedGrossEarnings: z.number().positive().int().optional(),
            estimatedGrossExpenditure: z.number().positive().int().optional(),
            requireDescriptionForTimeEntry: z.boolean().optional(),
            projectManagerId: z.string().optional(),
    });

export type ProjectEditFormSchema = z.infer<ReturnType<typeof projectEditFormSchema>>;