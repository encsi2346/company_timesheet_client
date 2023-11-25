import { z } from 'zod';

export const projectEditFormSchema = (isEditing: boolean) =>
    z.object({ //TODO: add special schema
            title: z.string().optional(),
            partner: z.string(),
            // projectStatus: z.coerce.number().positive().int().optional(),
            // projectType: z.coerce.number().positive().int().optional(),
            //projectManagerGivenName: z.string(),
            //projectManagerFamilyName: z.string(),
            estimatedStartDate: z.coerce.date(),
            estimatedEndDate: z.coerce.date(),
            estimatedHours: z.coerce.number().positive().int(),
            startDate: z.coerce.date().optional(),
            endDate: z.coerce.date().optional(),
            estimatedGrossEarnings: z.coerce.number().positive().int().optional(),
            estimatedGrossExpenditure: z.coerce.number().positive().int().optional(),
            // requireDescriptionForTimeEntry: z.coerce.boolean().optional(),
            // projectManagerId: z.string().optional(),
    });

export type ProjectEditFormSchema = z.infer<ReturnType<typeof projectEditFormSchema>>;