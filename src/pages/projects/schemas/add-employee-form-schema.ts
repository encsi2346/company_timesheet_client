import { z } from 'zod';

export const addEmployeeFormSchema =
    z.object({
        projectId: z.number(),
        employeeId: z.number(),
        role: z.string(),
        hourlyRate: z.number(),
    });

export type AddEmployeeFormSchema = z.infer<typeof addEmployeeFormSchema>;