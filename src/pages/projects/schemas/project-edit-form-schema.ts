import { z } from 'zod';

export const projectEditFormSchema = (isEditing: boolean) =>
    z.object({ //TODO: add special schema
            title: z.string(),
            partner: z.string(),
            projectStatus: z.string(),
            projectType: z.string(),
            projectManagerGivenName: z.string(),
            projectManagerFamilyName: z.string(),
            estimatedStartDate: z.string(),
            estimatedEndDate: z.string(),
            estimatedHours: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            estimatedGrossEarnings: z.string(),
            estimatedGrossExpenditure: z.string(),
            requireDescriptionForTimeEntry: z.string(),
            projectManagerId: z.string(),
    });

export type ProjectEditFormSchema = z.infer<ReturnType<typeof projectEditFormSchema>>;