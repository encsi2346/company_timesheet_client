import {z} from 'zod';
import {EmployeeContractType, EmployeePriviligeLevel} from "../../../api-client.ts";

export const userEditFormSchema = (isEditing: boolean) =>
    z.object({
        givenName: z.string().min(1),
        familyName: z.string().min(1),
        email: z.string().min(1).nullish(),
        privilegeLevel: z.coerce.number(),
        birthPlace: z.string().nullish(),
        birthDate: z.date().nullish(),
        phoneNumber: z.string().nullish(),
        address: z.string().nullish(),
        hireDate: z.date().nullish(),
        terminationDate: z.date().nullish(),
        jobTitle: z.string().nullish(),
        hourlyWage: z.coerce.number().nullish(),
        contractType: z.coerce.number().nullish(),
        expectedMonthlyHours: z.coerce.number().nullish(),
    });

export type UserEditFormSchema = z.infer<ReturnType<typeof userEditFormSchema>>;