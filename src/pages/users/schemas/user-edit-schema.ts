import { z } from 'zod';

export const userEditFormSchema = (isEditing: boolean) =>
    z.object({
        email: z.string().min(1).nullish(), //TODO: create emailregex
        priviligeLevel: z.number().nullish(),
        givenName: z.string().min(1),
        familyName: z.string().min(1),
        birthPlace: z.string(),
        birthDate: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        hireDate: z.string(),
        terminationDate: z.string(),
        jobTitle: z.string(),
        hourlyWage: z.number(),
        contractType: z.string(),
        expectedMonthlyHours: z.number(),
});

export type UserEditFormSchema = z.infer<ReturnType<typeof userEditFormSchema>>;